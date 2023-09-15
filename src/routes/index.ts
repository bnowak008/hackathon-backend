import { Router } from 'express';

import { saveAudio } from '../controllers';
import multer from 'multer';

const upload = multer({ dest: "public/files" });

const router = Router();

router.post("/saveAudio", upload.single("file"), saveAudio);

export default router;