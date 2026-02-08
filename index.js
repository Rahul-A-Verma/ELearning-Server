import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js"
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

let app = express()

app.use(express.json());
app.use(cors());

const port =process.env.PORT ||3000;

app.get('/',(req,res)=>{
  res.send("Hello")
})

app.use("/uploads",express.static("uploads"))


import userRoute from "./routes/userRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import courseRoute from "./routes/courseRoute.js"
app.use('/api',userRoute)
app.use('/api',adminRoute)
app.use('/api',courseRoute)


app.listen(port, ()=>{
    console.log(`server is running ${port}`)
  connectDb()
}
)