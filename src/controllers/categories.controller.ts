import { Request, Response } from "express";
import { createCategory } from "../services/categories.service";
import { handleHttpErrors } from "../utils/handle.errors";


const postCategory = async ({ body }: Request, response: Response) => {
  try {
    const category = await createCategory(body)
    return response.status(201).json(category)
  } catch (error: any) {
    handleHttpErrors(response, 'ERROR_POST_CATEGORY', error)
  }
}

export {
  postCategory,
};

