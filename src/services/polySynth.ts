import { PollyClient, StartSpeechSynthesisTaskCommand } from '@aws-sdk/client-polly';

export async function polySynth(textToVoicify: string) {
  const REGION = 'us-east-1';
  const S3_BUCKET = 'hackathon-voice';
  const pollyClient = new PollyClient({ region: REGION });
  const pollyParams = {
    OutputFormat: 'mp3',
    OutputS3BucketName: S3_BUCKET,
    Text: textToVoicify,
    TextType: 'text',
    VoiceId: 'Joanna',
    SampleRate: '22050',
  };

  try {
    const task = new StartSpeechSynthesisTaskCommand(pollyParams)
    const response = await pollyClient.send(task);
    console.log(response);
    return { url: response.SynthesisTask?.OutputUri };
  } catch (err) {
    console.log('Error putting object', err);
  }
}