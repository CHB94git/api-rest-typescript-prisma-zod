import { Request, Response } from 'express';
import { createNewUser, deleteUserDB, findAllUsers, findOneUser, getCarsUserById, getCategoriesUserById, loginUser, softActiveUser, softDeleteUser, updateUserDB } from '../services/users.service';
import { handleHttpErrors } from '../utils/handle.errors';


const register = async ({ body }: Request, response: Response) => {
  try {
    const responseUser = await createNewUser(body)
    return response.status(201).json(responseUser)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_CREATE_USER', error)
  }
}

const login = async ({ body }: Request, response: Response) => {
  try {
    const responseUser = await loginUser(body)

    if (responseUser === 'Incorrect_credentials') {
      return response.status(403).json(responseUser)
    }
    return response.send(responseUser)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_LOGIN', error)
  }
}

const getUserById = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const userById = await findOneUser(id)
    if (!userById)
      return response.status(404).json({ message: `User with id ${ id } not found!` })

    return response.status(200).json(userById)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_GET_USER_BY_ID', error)
  }
}

const getAllUsers = async (request: Request, response: Response) => {
  try {
    const users = await findAllUsers()
    return response.status(200).json(users)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_GET_ALL_USERS', error)
  }
}

const updateUser = async ({ params, body }: Request, response: Response) => {
  const { id } = params
  try {
    const user = await updateUserDB(id, body)
    return response.status(200).json(user)
  } catch (error: any) {
    if (error.code === 'P2025')
      handleHttpErrors(response.status(404), 'ERROR_UPDATE_USER', error.meta.cause)
  }
}

const disableuser = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const userDisabled = await softDeleteUser(id)
    return response.status(200).json(userDisabled)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_DISABLE_USER', error)
  }
}

const enableUser = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const userDisabled = await softActiveUser(id)
    return response.status(200).json(userDisabled)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_DISABLE_USER', error)
  }
}

const deleteUser = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    await deleteUserDB(id)
    return response.status(204).send()
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_DELETE_USER', error)
  }
}

const getAllCategoriesByUser = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const categoriesByUser = await getCategoriesUserById(id)
    return response.status(200).json({ categoriesByUser })
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_GET_ALL_CATEGORIES_BY_USER', error.message)
  }
}

const getAllCarsByUser = async ({ params }: Request, response: Response) => {
  try {
    const carsByUser = await getCarsUserById(params.id)
    return response.status(200).json({ carsByUser })
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_GET_ALL_CARS_BY_USER', error.message)
  }
}


export {
  deleteUser,
  disableuser,
  enableUser,
  getAllCarsByUser,
  getAllCategoriesByUser,
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
};

