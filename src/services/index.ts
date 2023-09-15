import { ListTranscriptionJobsCommand, StartTranscriptionJobCommand, TranscribeClient, StartTranscriptionJobCommandInput } from "@aws-sdk/client-transcribe";
import aws from 'aws-sdk';

const REGION = 'us-east-2';

import { polySynth } from './polySynth';
export { polySynth };

aws.config.update({ region: REGION });
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const transcribeClient = new TranscribeClient({ region: REGION });
const Bucket = 'hackathon-voice';

export const transcribeAudio = async (file: Express.Multer.File) => {
    const uploadParams: aws.S3.PutObjectRequest = {
        Bucket: Bucket,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: 'audio/mpeg'
    };

    let transcription = '';

    try {
        const stored = await s3.upload(uploadParams, async function (err: any, data: any) {
            if (err) {
                return console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        }).promise();

        await transcribeClient.send(new StartTranscriptionJobCommand({
            TranscriptionJobName: file.originalname,
            LanguageCode: "en-US", // For example, 'en-US',
            MediaFormat: 'ogg',
            Media: {
                MediaFileUri: stored.Location,
            },
            OutputBucketName: Bucket
        }));

        let status = 'IN_PROGRESS';
        transcription = await new Promise((resolve, reject) => {
            const progressInterval = setInterval(async () => {
            if (status === 'IN_PROGRESS') {
                const job = await getTranscribeJob(file.originalname);

                if (job && job?.TranscriptionJobStatus !== 'IN_PROGRESS') {
                    status = job?.TranscriptionJobStatus ?? '';

                    if (status === 'COMPLETED') {
                        const resp = await s3.getObject({
                            Bucket: Bucket,
                            Key: `${file.originalname}.json`,
                        }).promise()
                        
                        if (resp && resp.Body) {
                            resolve(JSON.parse(resp.Body.toString('utf-8')).results.transcripts[0].transcript ?? '');
                        }
                    }

                    clearInterval(progressInterval);
                }
            }
        }, 2000);
    });

    } catch (e) {
        console.error(e);
        return;
    }

    return transcription;
}

const getTranscribeJob = async (jobName: string) => {
    
    const data = await transcribeClient.send(
        new ListTranscriptionJobsCommand({
            JobNameContains: jobName
        })
    );

    return data.TranscriptionJobSummaries?.[0];
}
