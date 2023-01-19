import { prisma } from '../../prisma/client/prisma';

export const getCarsAuth = async () => {
  return await prisma.car.findMany()
}