import express from "express"
import { login, logout, Registation } from "../controllers/authController";
const authRouter = express.Router();

authRouter.post("/register",Registation)
authRouter.post("/login",login)
authRouter.get("/logout",logout)

export default authRouter;