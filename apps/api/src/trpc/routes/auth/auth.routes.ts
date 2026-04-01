import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signJWT } from "@/utils";
import { publicProcedure, router } from "../../trpc";
import { signUpInputSchema } from "./auth.schema";

export const authRouter = router({
  signUp: publicProcedure.input(signUpInputSchema).mutation(async ({ input }) => {
    const { email, name, password, username } = input;
    const existingEmail = await prisma.user.findFirst({ where: { email } });
    if (existingEmail) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Credential" });
    }
    const existingUsername = await prisma.user.findFirst({ where: { username } });
    if (existingUsername) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Username Already Exists" });
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        username: username.toLowerCase(),
      },
      omit: { password: true },
    });
    const token = await signJWT(user);
    return {
      user,
      token,
    };
  }),
});
