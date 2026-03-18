import {Request, Response } from "express";

import User from "../models/userSchema";

export interface AuthRequest extends Request {
  userId?: string;
}
export const getCurrUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user is not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: `error occurred while getting current user and error is : ${error}`,
    });
  }
};
export const getCurrAdmin = async (req: any, res: Response) => {
  try {
    return res.status(200).json({
      email: req.userId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting admin"
    });
  }
};