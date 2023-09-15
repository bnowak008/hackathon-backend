import { Request, Response } from 'express';

import { transcribeAudio, polySynth } from '../services';

export const saveAudio = (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);
    
    if (file) {
        const transcribedText = transcribeAudio(file);

        res.send(transcribedText);
    } else {
        res.status(400).send('no audio file passed with request')
    }
}

export const pollySynth = async (req: Request, res: Response) => {
    const text = `
        At the heart of a serene stream, Oda Otter-naga lounges with authority. His sleek, wet brown fur contrasts 
        brilliantly with his ornate armor, designed intricately with pearl and seashell embellishments. An impressive 
        helmet with a sea-star crest rests securely on his head, and his tiny paws firmly grasp a gleaming kelp-bladed 
        katana, a symbol of his martial prowess and desire to unify the river domains.
    `; //req.text;
    if (text) {
        const result= await polySynth(text);
        res.send(result);
    } else {
        res.status(400).send('no audio file passed with request')
    }
}