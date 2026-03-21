import { Document } from "mongoose";
export interface IProduct extends Document {
  name: string;
  image1: string;
  image2: string;
  image3: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}