import { Router } from 'express';
import {
  deleteUser,
  disableuser,
  enableUser,
  getAllCarsByUser,
  getAllCategoriesByUser,
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser
} from '../controllers/users.controller';
import { validateLogin, validateRegister, validateUpdateUser } from '../validators/users.validators';


const router = Router()

router.post('/auth/register', validateRegister, register)
router.post('/auth/login', validateLogin, login)

router.get('/', getAllUsers)

router.route('/:id')
  .get(getUserById)
  .put(validateUpdateUser, updateUser)
  .delete(deleteUser)  // PERMANENT DELETE 

router.get('/:id/cars', getAllCarsByUser)
router.get('/:id/categories', getAllCategoriesByUser)

router.patch('/:id/disable', disableuser) // SOFT DELETE
router.patch('/:id/enable', enableUser)


export { router };

