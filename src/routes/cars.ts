import { Router } from 'express';
import { addCategoryCar, createCar, deleteItem, getAllItems, getCarById, updateItem } from '../controllers/cars.controller';


const router = Router()

router.route('/')
  .get(getAllItems)
  .post(createCar)
  .patch(addCategoryCar)

router.route('/:id')
  .get(getCarById)
  .put(updateItem)
  .delete(deleteItem)

export { router };

