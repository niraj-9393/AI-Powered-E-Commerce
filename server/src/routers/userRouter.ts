import express from "express";
import { isAuth } from "../middleware/isAuth";
import { getCurrUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrUser);

export default userRouter;
