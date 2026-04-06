import { Request, Response } from "express";
import Order from "../models/orderSchema";
import User from "../models/userSchema";

export const orderPlaced = async (req: Request, res: Response) => {
  try {
     const userId = (req as any).userId;
    const { address, items, amount } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "unauthorized" });
    }
    if (!items || items.length === 0) {
  return res.status(400).json({ message: "Cart is empty" });
}

    const orderData = {
      userId, 
      items,
      amount,
      address,
      paymentMethod: "COD",
      status: "pending",
      payment: false,
      date: new Date() // better than Date.now()
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ message: "order placed ....." });
  } catch (error) {
    console.log("ERROR 👉", error);
    return res.status(500).json({ message: "order placed error" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error fetching orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    return res.status(200).json({ message: "status updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error updating status" });
  }
};
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error fetching all orders" });
  }
};