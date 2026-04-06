import { z } from "zod";

export const signUpSchema = z.object({
    username:z.string(),
    name:z.string(),
    email:z.email(),
    password:z.string(),
})

export const loginSchema = z.object({
    usernameOrEmail:z.string().min(1,"Username or Email is Required"),
    password:z.string().min(1,"password is required"),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema> 
export type LoginInSchemaType = z.infer<typeof loginSchema> 