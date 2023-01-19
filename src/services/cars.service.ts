import { Car } from '@prisma/client'
import { prisma } from '../../prisma/client/prisma'
// import { prisma } from '../database/config'

interface CarExt extends Car {
  categoryId: string
}

const insertCar = async (car: CarExt) => {
  const { color, description, energy, name, price, year, userId, categoryId } = car
  const newCar = await prisma.car.create({
    data: {
      name,
      color,
      description,
      energy,
      price,
      year,
      user: {
        connect: {
          id: userId
        }
      },
      categories: {
        connect: {
          id: categoryId
        }
      }
    },
    select: {
      id: true,
      name: true,
      color: true,
      description: true,
      energy: true,
      price: true,
      year: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      categories: {
        select: {
          id: true,
          name: true,
        }
      },
    }
  })
  return newCar
}

const addCarToCategory = async (id: string, categoryId: string) => {
  return await prisma.car.update({
    where: {
      id
    },
    data: {
      categories: {
        connect: {
          id: categoryId
        }
      }
    }
  })
}

const getOneCar = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true
        }
      }
    }
  })

  return car
}

const getAllCars = async () => {
  return await prisma.car.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      energy: true,
      description: true,
      year: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      categories: {
        select: {
          id: true,
          name: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  })
}

const updateCar = async (id: string, car: Car) => {
  const { color, description, energy, name, price, year } = car

  const responseUpdatedCar = await prisma.car.update({
    where: { id },
    data: {
      name,
      color,
      description,
      energy,
      price,
      year
    },
    select: {
      id: true,
      name: true,
      color: true,
      description: true,
      energy: true,
      price: true,
      year: true,
      user: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  return responseUpdatedCar
}

const deleteCar = async (id: string) => {
  const carToDelete = await prisma.car.findUniqueOrThrow({
    where: { id }
  })

  if (!carToDelete) return carToDelete

  await prisma.car.delete({
    where: { id }
  })

}


export {
  deleteCar,
  getAllCars,
  getOneCar,
  insertCar,
  updateCar,
  addCarToCategory,
}

