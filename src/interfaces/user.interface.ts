import { Auth } from "./auth.interface";


export interface User extends Auth {
  name: string
  description: string
  phone?: number
  direction?: Address
}

type Address = {
  street: String
  city: String
  state: String
  zip: String
}