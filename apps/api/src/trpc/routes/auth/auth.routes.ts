import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword, signJWT } from "@/utils";
import { publicProcedure, router } from "../../trpc";
import { loginInputSchema, signUpInputSchema, signUpOutputSchema } from "./auth.schema";

export const authRouter = router({
  signUp: publicProcedure.input(signUpInputSchema).output(signUpOutputSchema).mutation(async ({ input }) => {
    const { email, name, password, username } = input;
    const existingEmail = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });
    if (existingEmail) {
      throw new TRPCError({ code: "CONFLICT", message: "Email Already Exists" });
    }
    const existingUsername = await prisma.user.findFirst({ where: { username: username.toLowerCase() } });
    if (existingUsername) {
      throw new TRPCError({ code: "CONFLICT", message: "Username Already Exists" });
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
  login: publicProcedure.input(loginInputSchema).mutation(async ({ input }) => {
    const { password, usernameOrEmail } = input;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail.toLowerCase() }, { username: usernameOrEmail.toLowerCase() }],
      },
    });

    if (!existingUser) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Credential" });
    }
    const { password: hashedPassword, ...user } = existingUser;

    const isPasswordMatched = await comparePassword(password, hashedPassword);
    if (!isPasswordMatched) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Credential" });
      ;
    }
    const token = await signJWT(user);

    return {
      user,
      token,
    };
  }),
});
