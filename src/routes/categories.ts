import { Router } from 'express';
import { postCategory } from '../controllers/categories.controller';


const router = Router()

router.route('/')
  .get()
  .post(postCategory)



export { router };

