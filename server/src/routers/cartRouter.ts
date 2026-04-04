import express from "express";
import { addToCart, updateCart, getUserCart } from "../controllers/cartController";
import { isAuth } from "../middleware/isAuth";


const cartRouter = express.Router();

cartRouter.post("/add", isAuth, addToCart);
cartRouter.post("/update", isAuth, updateCart);
cartRouter.get("/get", isAuth, getUserCart);

export default cartRouter;