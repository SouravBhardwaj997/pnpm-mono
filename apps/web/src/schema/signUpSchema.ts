import { z } from "zod";

export const signUpSchema = z.object({
    username:z.string(),
    name:z.string(),
    email:z.email(),
    password:z.string(),
})

export const loginSchema = z.object({
    usernameOrEmail:z.string(),
    password:z.string(),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema> 
export type LoginInSchemaType = z.infer<typeof loginSchema> 