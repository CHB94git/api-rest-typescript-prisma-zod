import { Router } from 'express';
import { getCars } from '../controllers/orders.controller';
import { checkAuthStatus } from '../middlewares/check-session';

const router = Router()

router.get('/', checkAuthStatus, getCars)

export { router };

