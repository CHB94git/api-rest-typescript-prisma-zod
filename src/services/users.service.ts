import { User } from '@prisma/client';
import { prisma } from '../database/config';
import { encryptPassword, verifyPassword } from '../utils/handle.hash';
import { generateToken } from '../utils/handle.jwt';


const createNewUser = async (user: User) => {
  const checkIsExists = await prisma.user.findUnique({ where: { email: user.email } })

  if (checkIsExists) return `User with email: ${ user.email } already exists!`

  const passwordHashed = await encryptPassword(user.password)

  const registeredUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHashed,
      name: user.name,
      description: user.description,
      phone: user?.phone,
      address: user?.address,
      role: user.role,
      status: user.status
    }
  })

  return registeredUser
}

const loginUser = async ({ email, password }: User) => {
  const existsUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    }
  })

  if (!existsUser) return `User with email: ${ email } not found!`

  const passwordHashedDB = existsUser.password

  const isValidPassword = await verifyPassword(password, passwordHashedDB)

  if (!isValidPassword) return 'Incorrect_credentials'

  const token = await generateToken(existsUser.id)

  const data = {
    user: existsUser,
    token
  }

  return data

}

const findAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      status: true
    }
  })
  return users
}

const findOneUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  return user
}

const updateUserDB = async (id: string, data: User) => {
  const { name, email, password, address, description, phone, role, status } = data

  if (data.password) {
    const newPasswordHashed = await encryptPassword(password)
    const userUpdatedWithPassword = await prisma.user.update({
      where: { id },
      data: {
        email,
        password: newPasswordHashed,
        name,
        description,
        phone,
        address,
        role,
        status
      }
    })
    return userUpdatedWithPassword
  }

  const userUpdated = await prisma.user.update({
    where: { id },
    data: {
      email,
      name,
      description,
      phone,
      address,
      role,
      status
    }
  })
  return userUpdated
}

const softDeleteUser = async (id: string) => {
  const status: boolean = true
  return await prisma.user.update({
    where: { id },
    data: {
      status: !status
    }
  })
}

const softActiveUser = async (id: string) => {
  const status: boolean = false
  return await prisma.user.update({
    where: { id },
    data: {
      status: !status
    }
  })
}

const deleteUserDB = async (id: string): Promise<User> => {
  return await prisma.user.delete({ where: { id } })
}

const getCategoriesUserById = async (id: string) => {
  return await prisma.user.findMany({
    where: { id },
    include: {
      categories: true
    }
  })
}

const getCarsUserById = async (id: string) => {
  return await prisma.user.findMany({
    where: { id },
    include: {
      cars: true
    }
  })
}

export {
  createNewUser,
  deleteUserDB,
  findAllUsers,
  findOneUser,
  getCarsUserById,
  getCategoriesUserById,
  loginUser,
  softActiveUser,
  softDeleteUser,
  updateUserDB,
};

