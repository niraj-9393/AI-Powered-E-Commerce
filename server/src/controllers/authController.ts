import User from "../models/userSchema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtToken";

export const Registation = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const alreadyUsed = await User.findOne({ email });

        if (alreadyUsed) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        const token = await generateToken(newUser._id.toString());
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
            message: "User registered successfully",
            newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error while creating user"
        });
    }
};




export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Please register first" });
        }

        const isVerify = await bcrypt.compare(password, user.password);

        if (!isVerify) {
            return res.status(401).json({ message: "Password is wrong" });
        }

        const token = generateToken(user._id.toString());

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error while logging in"
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error while logout in"
        });
    }
}

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });


    if (!user) {
      user = await User.create({
        name,
        email
      });
    }

    const token = await generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Google login successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `google login error: ${error}`
    });
  }
};

