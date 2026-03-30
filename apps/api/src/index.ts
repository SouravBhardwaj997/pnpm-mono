import { connectDB } from "./db/db";
import { app } from "./lib/app";
import { env } from "./lib/env";
import { prisma } from "./lib/prisma";
import v1Router from "./routes/v1";
import "dotenv/config.js";

const PORT = env.PORT;

app.use("/api/health", async (_, res) => {
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

app.use("/api/v1", v1Router);

app.listen(PORT, async () => {
  await connectDB();
  // eslint-disable-next-line no-console
  console.log("Server is running at PORT", PORT);
});
