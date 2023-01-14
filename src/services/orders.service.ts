import { prisma } from '../database/config'


export const getCarsAuth = async () => {
  return await prisma.car.findMany()
}