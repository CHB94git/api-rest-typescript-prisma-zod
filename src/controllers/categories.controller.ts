import { Request, Response } from 'express';
import { createCategory, deleteCategory, findAll, findCategoryById, updateCategory } from '../services/categories.service';
import { handleHttpErrors } from '../utils/handle.errors';


const postCategory = async ({ body }: Request, response: Response) => {
  try {
    const category = await createCategory(body)
    return response.status(201).json(category)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_POST_CATEGORY', error)
  }
}

const getAllCategories = async (request: Request, response: Response) => {
  try {
    const categories = await findAll()
    return response.status(200).json(categories)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_GET_ALL_CATEGORIES', error)
  }
}

const getCategoryById = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const category = await findCategoryById(id)
    if (!category)
      return response.status(404).json({ message: `Categoria con id ${ id } not found` })

    return response.status(200).json({ category })
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_GET_CATEGORY_BY_ID', error)
  }
}

const updateCategoryById = async ({ params, body }: Request, response: Response) => {
  const { id } = params
  try {
    const updatedCategory = await updateCategory(id, body)

    return response.status(200).json(updatedCategory)
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_UPDATE_CATEGORY_BY_ID', error)
  }
}

const deleteCategoryById = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    await deleteCategory(id)
    return response.status(204).send()
  } catch (error: any) {
    handleHttpErrors(response.status(500), 'ERROR_DELETE_CATEGORY_BY_ID', error)
  }
}

export {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  postCategory,
  updateCategoryById,
};

