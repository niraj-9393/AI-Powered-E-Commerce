import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "token is not available" });
    }
   
    const tokenVerify = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!tokenVerify) {
      return res.status(400).json({ message: "invalid token" });
    }

    (req as any).userId = tokenVerify.id;

    next();
  } catch (error) {
    return res.status(400).json({
      message: `error occurred while verifying token: ${error}`,
    });
  }
};