import { Router } from 'express';
import { deleteUser, disableuser, enableUser, getAllUsers, getUserById, login, register, updateUser } from '../controllers/users.controller';

const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)

router.get('/', getAllUsers)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)  // PERMANENT DELETE 

router.patch('/:id/disable', disableuser) // SOFT DELETE
router.patch('/:id/enable', enableUser)


export { router };

