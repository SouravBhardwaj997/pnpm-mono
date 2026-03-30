import { asyncHandler } from "@/utils/asyncHandler";

export const signUp = asyncHandler((req, res) => {
  return res.json({ success: false, message: "he" });
});
