import aws from 'aws-sdk';
import { SageMakerRuntimeClient, InvokeEndpointCommand } from '@aws-sdk/client-sagemaker-runtime';

export async function imageGenerator(textToImagify: string) {
  const REGION = 'us-east-1';
  const IMAGE_PROCESS_ENDPOINT_NAME = 'jumpstart-dft-stable-diffusion-v2-1-base';
  const S3_BUCKET = 'hackathon-voice-1';

  aws.config.update({ region: REGION });

  const sageMakerClient = new SageMakerRuntimeClient({ region: REGION });
  const s3 = new aws.S3({ apiVersion: '2006-03-01' });

  const input = {
    EndpointName: IMAGE_PROCESS_ENDPOINT_NAME,
    ContentType: 'application/x-text',
    Body: Buffer.from(JSON.stringify(textToImagify))
  }
  const response = await sageMakerClient.send(new InvokeEndpointCommand(input));
  const responseBody = new TextDecoder().decode(response.Body);
  const responseData = JSON.parse(responseBody);

  const image = responseData.generated_image;
  console.log(image);

  // const uploadParams: aws.S3.PutObjectRequest = {
  //   Bucket: 'hackathon-voice-1',
  //   Key: file.originalname,
  //   Body: file.buffer
  // };

  return { message: 'All is well.', responseData };
}