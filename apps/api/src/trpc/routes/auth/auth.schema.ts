import z from "zod";

export const signUpInputSchema = z.strictObject({
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be longer than 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,32}$/, "Password must contains a lowercase, upppercase and special character"),
});
