import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { connectDB } from "./db/db";
import { app } from "./lib/app";
import { env } from "./lib/env";
import { prisma } from "./lib/prisma";
import { errorHanlder } from "./middlewares/errorHandler";
import v1Router from "./routes/v1";
import { appRouter } from "./trpc/appRouter";
import { createContext } from "./trpc/context";
import "dotenv/config.js";

const PORT = env.PORT;

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use("/health", async (_, res) => {
  try {
    await prisma.$connect();
    return res.json({
      success: true,
      message: "API is healthy",
      db: "Connected",
    });
  }
  catch (error) {
    console.error("Error in health api", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error }) => {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error("TRPC ERROR", error);
      }
    },
  }),
);

app.use("/api/v1", v1Router);
app.use(errorHanlder);

app.listen(PORT, async () => {
  await connectDB();
  // eslint-disable-next-line no-console
  console.log("Server is running at PORT", PORT);
});
