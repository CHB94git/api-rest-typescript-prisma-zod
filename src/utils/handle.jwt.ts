import jwt from 'jsonwebtoken'

const generateToken = (uid: string): Promise<Error | null | string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ uid }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    }, (error, token) => {
      if (error)
        return reject('No se pudo generar el token')
      resolve(token)
    })
  })
}

const verifyToken = async (jwtUser: string): Promise<string | jwt.JwtPayload> => {
  const isValidToken = jwt.verify(jwtUser, process.env.JWT_SECRET!)
  return isValidToken
}

export {
  generateToken,
  verifyToken
}

