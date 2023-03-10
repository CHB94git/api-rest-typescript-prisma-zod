import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/handle.jwt';

interface TokenErrors {
  [propertie: string]: string
}

const tokenVerificationErrors: TokenErrors = {
  ["jwt must be provided"]: "Debe de proporcionar un jsonwebtoken - Bearer Token",
  ["invalid signature"]: "Firma no válida del token",
  ["jwt malformed"]: "Formato inválido del token - token defectuoso",
  ["jwt expired"]: "El jsonwebtoken ha expirado",
  ["invalid token"]: "Token no válido"
}

export const checkAuthStatus = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.headers.authorization === undefined)
      throw new Error('jwt must be provided')

    const jwt = request.headers.authorization
    const token = jwt.split(' ').pop()

    const isAuth = await verifyToken(`${ token }`) as { uid: string }
    request.user = isAuth
    next()
  } catch (error: any) {
    console.log({ error })
    response
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] })
  }
}


