import { schemaValidatorMiddleware } from '../middlewares/schema-validator';
import { loginSchema, partialUserSchema, userSchema, userUpdateSchema } from '../schemas/users.schemas';


export const validateLogin = schemaValidatorMiddleware(loginSchema)

export const validateRegister = schemaValidatorMiddleware(userSchema)

export const validateUpdateUser = schemaValidatorMiddleware(userUpdateSchema)

export const validateUpdateUserPartial = schemaValidatorMiddleware(partialUserSchema)
