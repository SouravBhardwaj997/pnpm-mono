import { z } from "zod";

export const signUpSchema = z.strictObject({
  params: z.object({}),
  query: z.object({}),
  body: z.strictObject({
    username: z.string().min(1, "Username is required"),
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be longer than 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,32}$/, "Password must contains a lowercase, upppercase and special character"),
  }),
});

export const loginSchema = z.object({
  params: z.object({}),
  query: z.object({}),
  body: z.strictObject({
    usernameOrEmail: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be longer than 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,32}$/, "Password must contains a lowercase, upppercase and special character"),
  }),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
