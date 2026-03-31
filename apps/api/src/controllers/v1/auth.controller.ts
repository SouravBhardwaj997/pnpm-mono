import type { signUpSchemaType } from "@/schemas/auth.schema";
import { asyncHandler } from "@/utils/asyncHandler";

export const signUp = asyncHandler((req, res) => {
  const { email, password, username } = req.body as signUpSchemaType["body"];
  console.log("email", email);
  console.log("password", password);
  console.log("username", username);
  return res.json({ success: false, message: "he" });
});
