import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);

const PORT = 8080;

app.listen(PORT, async () => {
  try {
    console.log(`Server listening on port ${PORT} in  environment`);
    await connectDB();
  } catch (error) {
    console.log(error);
  }
});
