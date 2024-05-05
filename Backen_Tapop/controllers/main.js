import users from "../schema/model.js"

import axios from "axios"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
export const SignUp=async (req,res,next)=>{
    const {name,password,email,image,token,phone}=req.body;
  try{    axios.post("https://www.google.com/recaptcha/api/siteverify",{
        secret:process.env.SECRETROBO,
        response:token
    },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(({data})=>
    {
        console.log(data)
        if(!data.success){
            res.send({staus:"Invalid Recapcha"});
        }
    }).catch((err)=>{
        res.send({staus:"Invalid Recapcha"})
    }) 
    
    
}
catch (err){
res.send({status:"Invalid Recapcha"});
}
const use=new users({name,password,email,image,phone});
            await use.save();

            res.send({status:"Succesfull"});

}








export const Post= async (req,res)=>{
   const data = await users.find();
   res.send(data);
}
export const Userdetail= async(req,res)=>{
     const {email}=req.body;
    const data = await users.find({email});
    console.log(data);
    if(data.length>0)
    res.send(data);
else {
    res.send("First create your account");
}
}