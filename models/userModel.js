import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
  userName:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  role:{
    type:String,
    default:"user"
  },
  mainrole: {
    type: String,
    default: "user",
  },
  subscription:[
   { 
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
  }
],
},
{timestamps:true}
)
export const User = mongoose.model("User", schema);