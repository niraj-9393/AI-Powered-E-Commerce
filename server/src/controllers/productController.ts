import { Request, Response } from "express";
import Product from "../models/producrSchema";
import uploadOnCloudinar from "../config/cloudinary";

interface MulterFiles {
    image1?: Express.Multer.File[];
    image2?: Express.Multer.File[];
    image3?: Express.Multer.File[];
}
export const addProduct = async (req: Request, res: Response) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        const files = req.files as MulterFiles | undefined;
        if (!files?.image1?.[0] || !files?.image2?.[0] || !files?.image3?.[0]) {
            return res.status(400).json({
                message: "All three images are required",
            });
        }
      
        const image1 = await uploadOnCloudinar(files.image1[0].path);
        const image2 = await uploadOnCloudinar(files.image2[0].path);
        const image3 = await uploadOnCloudinar(files.image3[0].path);

        if (!image1 || !image2 || !image3) {
            return res.status(500).json({
                message: "Image upload failed",
            });
        }
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({ message: "All fields are required" });
        }
   
        const newProduct = {
            name,
            image1,
            image2,
            image3,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller || false,
            date: Date.now(),
        };

        const createdProduct = await Product.create(newProduct);

        return res.status(201).json({
            message: "Product added successfully",
            product: createdProduct,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong while addPRoduct",
            error,
        });
    }
};
export const listProducts = async (req: Request, res: Response) => {
    try {
        const product = await Product.find({});

        return res.status(200).json({ message: "all product featched  successfully",product});
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong while listing all products",
            error,
        });
    }
};

export const removeProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        const product = await Product.findByIdAndDelete(id); 

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            message: "Product removed successfully",
            product,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong while removing the product",
            error,
        });
    }
};