import { StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import aws from 'aws-sdk';

const REGION = 'us-east-1';

aws.config.update({ region: REGION});
const s3 = new aws.S3();

export const transcribeAudio = async (file: Express.Multer.File) => {
    const transcribeClient = new TranscribeClient({ region: REGION });

    console.log(process.env);

    // console.log(s3.listBuckets());

    const data = await transcribeClient.send(new StartTranscriptionJobCommand({
        TranscriptionJobName: file.filename,
        LanguageCode: "en-US", // For example, 'en-US'
        MediaFormat: "MP3", // For example, 'wav'
        Media: {
          MediaFileUri: "SOURCE_LOCATION",
          // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
        },
        OutputBucketName: "OUTPUT_BUCKET_NAME"
    }))

    return 'test';
}