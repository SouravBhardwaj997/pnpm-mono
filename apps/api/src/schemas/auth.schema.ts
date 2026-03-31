import { z } from "zod";

export const signUpSchema = z.strictObject({
  params: z.object({}),
  query: z.object({}),
  body: z.strictObject({
    username: z.string().min(1, "Username is required"),
    email: z.email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  }),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
