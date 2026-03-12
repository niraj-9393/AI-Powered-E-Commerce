import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter";
import connectDB from "./config/connectDb";
import dotenv from "dotenv";
import cors,{ CorsOptions } from "cors";



const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.get("/", (req: Request, res: Response) => {
  res.send("Server running 🚀");
});
app.defaultConfiguration

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,   // ← allow cookies/auth headers
}

app.use(cors(corsOptions))
app.use('/api/auth',authRouter)
const PORT = Number(process.env.PORT) || 6000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});