const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email :{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{
    versionKey : false
})

const AdminModel = mongoose.model("admin",adminSchema)

module.exports ={
    AdminModel
}