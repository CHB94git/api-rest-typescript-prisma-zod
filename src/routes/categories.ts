import { Router } from 'express';
import { deleteCategoryById, getAllCategories, getCategoryById, postCategory, updateCategoryById } from '../controllers/categories.controller';


const router = Router()

router.route('/')
  .get(getAllCategories)
  .post(postCategory)


router.route('/:id')
  .get(getCategoryById)
  .patch(updateCategoryById)
  .delete(deleteCategoryById)


export { router };

