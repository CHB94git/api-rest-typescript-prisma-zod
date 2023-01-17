import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "El email es requerido",
      invalid_type_error: "Escribe un email válido"
    }).trim().min(1).email(),
    password: z.string({
      required_error: "La contraseña es requerida"
    }).trim().min(6, 'La contraseña debe ser mínimo de 6 caracteres')
  })
})

export type LoginType = z.infer<typeof loginSchema>

export const userSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "El nombre es requerido"
      })
      .trim()
      .min(1, 'name no puede ser vacío'),
    email: z
      .string({
        required_error: "El email es requerido",
        invalid_type_error: "Escribe un email válido"
      })
      .trim()
      .email()
      .min(1, 'name no puede ser vacío')
      .max(60, 'No se permiten más de 60 caracteres en el campo email'),
    password: z
      .string({
        required_error: "La contraseña es requerida"
      })
      .trim()
      .min(6, 'La contraseña debe ser mínimo de 6 caracteres'),
    description: z
      .string()
      .optional(),
    role: z
      .enum(['user', 'admin'], {
        errorMap: (issue, ctx) => {
          return { message: 'Rol no válido' }
        }
      })
      .optional(),
    status: z.boolean().optional(),
    phone: z.number().optional(),
    address: z.object({
      street: z.string().trim().min(1),
      city: z.string().trim().min(1),
      state: z.string().trim().min(1),
      zip: z.string().trim().min(1)
    }).optional()
  })
})

export type CreateUserDto = z.infer<typeof userSchema>
// export type CreateUserDto = z.infer<typeof UserSchema>;


export const PartialUserSchema = userSchema.partial();

export type UpdateUserDto = z.infer<typeof PartialUserSchema>;