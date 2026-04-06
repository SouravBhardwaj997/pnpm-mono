import { z } from "zod";

export const signUpSchema = z.object({
    username:z.string(),
    name:z.string(),
    email:z.email(),
    password:z.string(),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema> 