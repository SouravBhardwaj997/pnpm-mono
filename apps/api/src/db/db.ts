import { prisma } from "@/lib/prisma";

export async function connectDB() {
  try {
    await prisma.$connect();
  }
  catch (error) {
    console.error("Error while connectin DB", error);
  }
}
