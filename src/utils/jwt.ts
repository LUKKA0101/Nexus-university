import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY não definida no .env");
}

export const generateInviteToken = (userId: number): string => {
  return jwt.sign({ userId }, SECRET_KEY!, { expiresIn: "48h" });
};

export const generateAccessToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, SECRET_KEY!, { expiresIn: "2h" });
};
