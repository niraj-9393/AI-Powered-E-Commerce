import express from "express"
import { adminLogin, googleLogin, login, logout, Registation } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register",Registation)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/googleLogin",googleLogin);
authRouter.post("/adminlogin",adminLogin)
export default authRouter;