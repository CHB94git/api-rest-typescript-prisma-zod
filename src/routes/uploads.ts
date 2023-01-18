import { Router } from 'express';
import { uploadFile } from '../controllers/uploads.controller';
import { checkAuthStatus } from '../middlewares/check-session';
import multerMiddleware from '../middlewares/upload-files';


export const router = Router()

router.post('/', checkAuthStatus, multerMiddleware.single('file'), uploadFile)

