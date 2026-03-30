import { Router } from "express";
import { signUp } from "@/controllers/v1/auth.controller";

const router = Router();

router.post("/sign-up", signUp);

export default router;
