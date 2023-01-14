import { Response } from 'express'

export const handleHttpErrors = (response: Response, error: string, errorRaw?: any) => {
  console.log({ errorRaw })
  return response.json({
    place: error,
    error: errorRaw
  })
}