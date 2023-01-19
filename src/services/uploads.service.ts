import { Storage } from '@prisma/client';
import { prisma } from '../../prisma/client/prisma';


export const registerUpload = async ({ fileName, path, userId }: Omit<Storage, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await prisma.storage.create({
    data: {
      fileName,
      userId,
      path,
    }
  })
}