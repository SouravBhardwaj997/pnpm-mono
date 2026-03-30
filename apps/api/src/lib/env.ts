import process from "node:process";
import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().default(8001),
});

// eslint-disable-next-line node/no-process-env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.issues);
  process.exit(1);
}

export const env = parsedEnv.data;
