import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter";
import connectDB from "./config/connectDb";
import dotenv from "dotenv";




const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.get("/", (req: Request, res: Response) => {
  res.send("Server running 🚀");
});
app.defaultConfiguration
app.use('/api/auth',authRouter)
const PORT = Number(process.env.PORT) || 6000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});