import { Storage } from '@prisma/client';
import { Response } from 'express';
import { RequestExt } from '../interfaces/req-extended';
import { registerUpload } from '../services/uploads.service';
import { handleHttpErrors } from '../utils/handle.errors';


export const uploadFile = async (request: RequestExt, response: Response) => {
  try {
    const { user, file } = request
    const dataToUpload: Omit<Storage, 'id' | 'createdAt' | 'updatedAt'> = {
      fileName: `${ file?.filename }`,
      userId: `${ user?.uid }`,
      path: `${ file?.path }`,
    }
    const result = await registerUpload(dataToUpload)
    return response.status(201).send(result)
  } catch (error: any) {
    handleHttpErrors(response.status(500), "ERROR_UPLOAD_FILE", error);
  }
}