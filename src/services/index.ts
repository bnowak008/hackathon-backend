import { StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import aws from 'aws-sdk';

const REGION = 'us-east-1';

import { polySynth } from './polySynth';
export { polySynth };

aws.config.update({ region: REGION});
const s3 = new aws.S3({apiVersion: '2006-03-01'});

export const transcribeAudio = async (file: Express.Multer.File) => {
    const transcribeClient = new TranscribeClient({ region: REGION });

    const uploadParams: aws.S3.PutObjectRequest = {
        Bucket: 'hackathon-voice',
        Key: file.originalname,
        Body: file.buffer
    };

    let fileLocation;
    s3.upload(uploadParams, function (err: any, data: any) {
        if (err) {
            return console.log("Error", err);
        } if (data) {
            fileLocation = data.Location;
            console.log("Upload Success", data.Location);
        }
    });

    if (fileLocation) {
        const data = await transcribeClient.send(new StartTranscriptionJobCommand({
            TranscriptionJobName: file.originalname,
            LanguageCode: "en-US", // For example, 'en-US'
            MediaFormat: "MP3", // For example, 'wav'
            Media: {
                MediaFileUri: fileLocation,
                // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
            },
            OutputBucketName: "OUTPUT_BUCKET_NAME"
        }))
    }

    return 'test';
}