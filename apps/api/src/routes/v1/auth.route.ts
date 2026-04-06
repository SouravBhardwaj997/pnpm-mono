import { Router } from "express";
import { login, signUp } from "@/controllers/v1/auth.controller";
import { validate } from "@/middlewares/validate";
import { loginSchema, signUpSchema } from "@/schemas/auth.schema";

const router = Router();

router.post("/sign-up", validate(signUpSchema), signUp);

router.post("/login", validate(loginSchema), login);
export default router;
