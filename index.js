import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";

// Import routes at the top
import userRoute from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import courseRoute from "./routes/courseRoute.js";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Simple Request Logger (Check Render logs to see these)
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

const port = process.env.PORT || 3000;

// Routes
app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api", courseRoute);

app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});