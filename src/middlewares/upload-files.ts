import { Request } from 'express';
import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';


const PATH_STORAGE = `${ process.cwd() }/storage`;

const fileFilter = (request: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    return callback(new Error('Only images are accepted'));

  return callback(null, true)
}

const storage = diskStorage({
  destination(request: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    return callback(null, PATH_STORAGE)
  },
  filename(request: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    const extFile = file.originalname.split('.').pop()
    const newFileName = `${ uuidv4() }.${ extFile }`
    return callback(null, newFileName)
  },
})

const multerMiddleware = multer({
  fileFilter,
  storage
})

export default multerMiddleware