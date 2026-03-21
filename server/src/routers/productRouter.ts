import express from "express";
import upload from "../middleware/multer";
import { addProduct, listProducts, removeProduct } from "../controllers/productController";
import { isAdminAuth } from "../middleware/isAuth";
const productRouter = express.Router();

productRouter.post("/addproduct",
    upload.fields([{ name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },]), addProduct)

    productRouter.get("/list",listProducts)
    productRouter.post("/remove/:id",isAdminAuth,removeProduct)
export default productRouter;