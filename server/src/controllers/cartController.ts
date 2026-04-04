import { Request, Response } from "express";
import User from "../models/userSchema";


// ── Add to Cart ──
export const addToCart = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "productId and size are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = user.cartData as Record<string, Record<string, number>>;

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = { [size]: 1 };
    }

    user.cartData = cartData;
    user.markModified("cartData"); // ← THIS is the fix
    await user.save();

    return res.status(200).json({ message: "Item added to cart", cartData: user.cartData });
  } catch (error) {
    return res.status(500).json({ message: `Error adding to cart: ${error}` });
  }
};

// ── Update Cart ──
export const updateCart = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const { productId, size, quantity } = req.body;

    if (!productId || !size || quantity === undefined) {
      return res.status(400).json({ message: "productId, size and quantity are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = user.cartData as Record<string, Record<string, number>>;

    if (quantity === 0) {
      if (cartData[productId]) {
        delete cartData[productId][size];
        if (Object.keys(cartData[productId]).length === 0) {
          delete cartData[productId];
        }
      }
    } else {
      if (!cartData[productId]) {
        cartData[productId] = {};
      }
      cartData[productId][size] = quantity;
    }

    user.cartData = cartData;
    user.markModified("cartData"); // ← THIS is the fix
    await user.save();

    return res.status(200).json({ message: "Cart updated", cartData: user.cartData });
  } catch (error) {
    return res.status(500).json({ message: `Error updating cart: ${error}` });
  }
};

// ── Get Current User Cart ──
export const getUserCart = async (req: any, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cartData: user.cartData });
  } catch (error) {
    return res.status(500).json({ message: `Error getting cart: ${error}` });
  }
};