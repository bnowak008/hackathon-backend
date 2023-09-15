import { Router } from 'express';
import multer from 'multer';
import {
  saveAudio,
  processTextToImage,
  processTextToVoice
} from '../controllers';

const upload = multer();
const router = Router();

router.post("/saveAudio", upload.single("file"), saveAudio);
router.post("/textToVoice", processTextToVoice);
router.post("/textToImage", processTextToImage);

export default router;