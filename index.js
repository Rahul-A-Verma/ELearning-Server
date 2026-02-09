import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js"
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

const url = `https://elearning-server-bok4.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);


export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

let app = express()

app.use(express.json());
app.use(cors());

const port =process.env.PORT;

app.get('/',(req,res)=>{
  res.send("Hello")
})

app.use("/uploads",express.static("uploads"))


import userRoute from "./routes/userRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import courseRoute from "./routes/courseRoute.js"
app.use("/api",userRoute)
app.use("/api",adminRoute)
app.use("/api",courseRoute)


app.listen(port, ()=>{
    console.log(`server is running ${port}`)
  connectDb()
}
)