import { Router } from "express";
import { signUp } from "@/controllers/v1/auth.controller";
import { validate } from "@/lib/validate";
import { signUpSchema } from "@/schemas/auth.schema";

const router = Router();

router.post("/sign-up", validate(signUpSchema), signUp);

export default router;
