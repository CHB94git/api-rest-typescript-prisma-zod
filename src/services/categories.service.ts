import { Category } from '@prisma/client';
import { prisma } from '../../prisma/client/prisma';

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

const findAll = async () => {
  return await prisma.category.findMany()
}

const findCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id }
  })
}

const updateCategory = async (id: string, categoryData: Category) => {
  const { name, userId } = categoryData
  return await prisma.category.update({
    where: { id },
    data: {
      name,
      userId
    },
    select: {
      id: true,
      name: true,
      user: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({ where: { id } })
}

export { createCategory, findAll, findCategoryById, updateCategory, deleteCategory };

