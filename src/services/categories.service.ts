import { Category } from '@prisma/client';
import { prisma } from '../client/prisma';

const createCategory = async ({ name, userId }: Category) => {
  return await prisma.category.create({
    data: {
      name,
      user: {
        connect: {
          id: userId
        }
      },
    },
    select: {
      id: true,
      name: true,
      user: {
        select: {
          id: true,
          name: true
        }
      },
    },

  })
}

export { createCategory };

