import z from "zod";

export const signUpInputSchema = z.strictObject({
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be longer than 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,32}$/, "Password must contains a lowercase, upppercase and special character"),
});

export const signUpOutputSchema = z.strictObject({
  user: z.object({
    username: z.string().min(1, "username is required"),
    name: z.string().min(1, "username is required"),
    email: z.string().min(1, "username is required"),
    createdAt: z.date().min(1, "username is required"),
    id: z.number().min(1, "username is required"),
  }),
  token: z.string().min(1, "token is required"),
});

export const loginInputSchema = z.strictObject({
  usernameOrEmail: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be longer than 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,32}$/, "Password must contains a lowercase, upppercase and special character"),
});
