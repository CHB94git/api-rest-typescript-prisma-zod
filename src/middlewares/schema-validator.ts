import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';


export const schemaValidatorMiddleware = (schema: AnyZodObject) => (request: Request, response: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: request.body,
      query: request.query,
      params: request.params
    })
    return next()
  } catch (error: unknown) {
    console.log('clg schemaValidator', error)
    if (error instanceof ZodError) {
      return response.status(400).json(
        error.issues.map((issue) => ({
          code: issue.code,
          path: issue.path[0],
          message: issue.message
        }))
      )
    }
    return response.status(500).json({ message: "Internal Server Error" });
  }
} 