import { Document } from "mongoose";
type CartData = {
  _id: string;
  size: string;
  quantity: number;
};

export interface Iorder extends Document {
  userId: string;
  items: Array<CartData>;
  amount: Number;
  address: {
    firstName: String,
    lastName:String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  };
  status: string;
  paymentMethod: string;
  payment: Boolean;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}