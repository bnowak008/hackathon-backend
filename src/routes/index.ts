import { Router } from 'express';

import { Controller } from '../controllers';
import multer from 'multer';

const upload = multer({ dest: "public/files" });

const router = Router();

router.post("/saveAudio", upload.single("file"), (req, res) => {
    console.log(req.file);
});

export default router;