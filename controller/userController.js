import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import trycatch from "../middleware/trycatch.js";


export const registerUSer = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let user = await User.findOne({ email });
    //  console.log(req.body);

    if (user) {
      return res.status(400).json({
        message: "User Already exists",
      });
    }
    //  console.log("user", user);

    const hashPassword = await bcrypt.hash(password, 10);
    user = {
      userName,
      email,
      password: hashPassword,
    };
    console.log("user", user);
    //  console.log("hashPassword", hashPassword);

    const otp = Math.floor(Math.random() * 1000000);

    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.Activation_secret,
      {
        expiresIn: "5m",
      }
    );

    const data = {
      userName,
      otp,
    };
    await sendMail(email, "E learning", data);

    res.status(200).json({
      message: "otp send to your mail",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const verifyUser = trycatch(async(req,res)=>{

  const {activationToken, otp} = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_secret)

  if(!verify){
    res.status(500).json({
      message:"otp expire"
    })
  }
  if(verify.otp !== otp){
    res.status(500).json({
      message:"wrong otp"
    })
  }

  await User.create({
    userName: verify.user.userName,
    email: verify.user.email,
    password: verify.user.password
  })

  res.status(200).json({
    message:"user register "
  })
})


export const loginUser = trycatch(async(req,res)=>{
  const {email, password}= req.body

  const user =await User.findOne({email})

  if(!user)
    return res.status(400).json({
      message:"email not found",
    });
// const matchPassword = await bcrypt.compare(password, user.password);
  const matchPassword = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, same) => {
        if (err) reject(err);
        resolve(same);
    });
});

  if(!matchPassword)
    return res.status(400).json({
      message:"wrong password"
    });
  
  const token = jwt.sign({_id:user._id},process.env.Jwt_Secret,{
    expiresIn:"15d",
  })

  res.json({
    message:`welcome ${user.userName}`,
    token,
    user,

  })
})


export const myProfile = trycatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});