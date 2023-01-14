import { compare, hash } from "bcrypt"


const encryptPassword = async (password: string): Promise<string> => {
  const passwordHashDB = await hash(password, 10)
  return passwordHashDB
}

const verifyPassword = async (password: string, passwordHashedDB: string): Promise<boolean> => {
  const isCorrect = await compare(password, passwordHashedDB)
  return isCorrect
}

export {
  encryptPassword,
  verifyPassword
}

