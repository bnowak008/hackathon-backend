import { Router } from 'express';

import { saveAudio, pollySynth } from '../controllers';
import multer from 'multer';

const upload = multer();

const router = Router();

router.post("/saveAudio", upload.single("file"), saveAudio);
router.post("/pollySynth", pollySynth);

export default router;