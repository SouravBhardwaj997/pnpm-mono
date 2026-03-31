import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(originalPassword: string, hashedPassword: string) {
  const isSuccess = await bcrypt.compare(originalPassword, hashedPassword);
  return isSuccess;
}
