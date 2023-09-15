import { Request, Response } from 'express';

const saveAudio = (req: Request, res: Response) => {
    console.log(req.body);

    res.status(200).send('yes')
}

export const Controller = { saveAudio };
