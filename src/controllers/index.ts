import { Request, Response } from 'express';

import { transcribeAudio } from '../services';

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
