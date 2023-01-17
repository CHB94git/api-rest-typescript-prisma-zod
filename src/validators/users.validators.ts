import { schemaValidatorMiddleware } from '../middlewares/schema-validator';
import { PartialUserSchema, loginSchema, userSchema } from '../schemas/users.schemas';


export const validateLogin = schemaValidatorMiddleware(loginSchema)

export const validateRegister = schemaValidatorMiddleware(userSchema)

export const validateUpdateUser = schemaValidatorMiddleware(PartialUserSchema)