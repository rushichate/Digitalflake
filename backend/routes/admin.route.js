const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { AdminModel } = require("../models/admin.model")

const adminRouter = express.Router()

adminRouter.post("/register",async(req,res)=>{
      const {first_name,last_name,email,password} = req.body
    try{
        const hashPassword = bcrypt.hashSync(password,4)
        const newAdmin = new AdminModel({first_name,last_name,email,password:hashPassword})
        newAdmin.save()
        res.status(201).json({message:"Admin registered successfully"})
    }catch(error){
       res.status(400).json({message:error})
    }
})

adminRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const isEmailPresent =await AdminModel.findOne({email})
        if(!isEmailPresent){
          return  res.status(202).json({message:"Invalid Email Address"})
        }
        const isPasswordValid = bcrypt.compareSync(password,isEmailPresent.password)
        if(!isPasswordValid){
            return res.status(202).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({userID:isEmailPresent._id},"masai")
        res.status(201).json({message:"Login Successful",token:token})

    }catch(error){
        res.status(400).json({message:error})
     }
})

adminRouter.get("/",async(req,res)=>{
    try{
        const data = await AdminModel.find()
        res.status(201).json(data)

    }catch(error){
        res.status(400).json({message:error})
     }
})



module.exports = {
    adminRouter
}