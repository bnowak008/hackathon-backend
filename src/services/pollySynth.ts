import { PollyClient, StartSpeechSynthesisTaskCommand, StartSpeechSynthesisTaskCommandInput } from '@aws-sdk/client-polly';

export async function pollySynth(textToVoicify: string) {
  const REGION = 'us-east-1';
  const S3_BUCKET = 'hackathon-voice-1';
  const pollyClient = new PollyClient({ region: REGION });
  const pollyParams: StartSpeechSynthesisTaskCommandInput = {
    Engine: 'neural',
    OutputFormat: 'mp3',
    OutputS3BucketName: S3_BUCKET,
    Text: textToVoicify,
    TextType: 'text',
    VoiceId: 'Joey',
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