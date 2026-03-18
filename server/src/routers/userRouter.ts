import express from "express";
import { isAdminAuth, isAuth } from "../middleware/isAuth";
import { getCurrAdmin, getCurrUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrUser);
userRouter.get("/getcurrentadmin", isAdminAuth, getCurrAdmin);

export default userRouter;
