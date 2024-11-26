const mongoose =require('mongoose')
const appointmentsschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, companyname:{
        type:String,
        required:true
    }, plan:{
        type:String,
        required:true,enum:["basic","standard","premium"]
    }, pages:{
        type:[String],
        minlength:1,
        required:true
    }, message:{
        type:String,
        required:true
    }
},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}})

const appointment=mongoose.model("appointments",appointmentsschema)
module.exports=appointment