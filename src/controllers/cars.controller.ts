import { Request, Response } from 'express';
import { addCarToCategory, deleteCar, getAllCars, getOneCar, insertCar, updateCar } from '../services/cars.service';
import { handleHttpErrors } from '../utils/handle.errors';


const getCarById = async ({ params: { id } }: Request, response: Response) => {
  try {
    const car = await getOneCar(id)
    if (!car)
      return response.status(404).json({ message: `Car with id ${ id } not found` })
    response.status(200).json(car)
  } catch (error: any) {
    return response.status(500).json(error)
  }
}

const getAllItems = async (request: Request, response: Response) => {
  try {
    const respGetAll = await getAllCars()
    return response.status(200).json(respGetAll)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR GET ALL ITEMS', error)
  }
}

const createCar = async ({ body }: Request, response: Response) => {
  try {
    const car = await insertCar(body)
    response.status(201).json(car)
  } catch (error: any) {
    handleHttpErrors(response, 'ERROR POST ITEM', error)
  }
}

const updateItem = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const responseUpdatedItem = await updateCar(id, request.body)
    response.send(responseUpdatedItem)
  } catch (error: any) {
    handleHttpErrors(response, 'ERROR UPDATE ITEM', error)
  }
}

const deleteItem = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const responseDeleteItem = await deleteCar(id)
    response.status(204).send(responseDeleteItem)
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.log(error)
      return response.status(404).json(`Car with id ${ id } dont exists - impossible to delete`)
    }
  }
}

const addCategoryCar = async (request: Request, response: Response) => {
  const { id, categoryId } = request.query
  try {
    const car = await addCarToCategory(id, categoryId)

    if (!car) return response.status(404).json({ message: 'car not found' })

    return response.status(200).json(car)
  } catch (error: any) {
    handleHttpErrors(response, 'ERROR_ADD_CAR_TO_CATEGORY', error)
  }
}

export {
  deleteItem,
  getAllItems,
  getCarById,
  createCar,
  updateItem,
  addCategoryCar,
};

