import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const generateInviteToken = (userId: number): string => {
  return jwt.sign({ id: userId }, SECRET_KEY!, { expiresIn: "48h" });
};

export const generateAccessToken = (userId: number, role: string): string => {
  return jwt.sign({ id: userId, role }, SECRET_KEY!, { expiresIn: "2h" });
};
