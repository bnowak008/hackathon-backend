import { StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import aws from 'aws-sdk';

const REGION = 'us-east-1';

import { pollySynth } from './pollySynth';
import { imageGenerator } from './imageGenerator';
export { pollySynth, imageGenerator };

aws.config.update({ region: REGION });
const s3 = new aws.S3({apiVersion: '2006-03-01'});

export const transcribeAudio = async (file: Express.Multer.File) => {
    const transcribeClient = new TranscribeClient({ region: REGION });

    const uploadParams: aws.S3.PutObjectRequest = {
        Bucket: 'hackathon-voice-1',
        Key: file.originalname,
        Body: file.buffer
    };

    try {
        const stored = await s3.upload(uploadParams, async function (err: any, data: any) {
            if (err) {
                return console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        }).promise();

        const test = await transcribeClient.send(new StartTranscriptionJobCommand({
            TranscriptionJobName: file.originalname,
            LanguageCode: "en-US", // For example, 'en-US'
            MediaFormat: "mp3", // For example, 'wav'
            Media: {
                MediaFileUri: stored.Location,
                // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
            },
        }));

        console.log(test);
    } catch (e) {
        console.error(e);
        return;
    }

    return 'test';
}