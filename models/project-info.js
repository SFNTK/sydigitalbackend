const mongoose=require("mongoose")

const infoschema=new mongoose.Schema({
    companyname:{
        type:String,required:true
    },   oldwebsite:{
        type:String,required:true
    },   logo:{
        type:String,required:true
    },   images:{
        type:[String],required:true
    }   ,socialmedia:{
        type:[{name:String,link:String}],required:true
    },   policies:{
        type:String,required:true
    }

},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}})

const infoprjct=mongoose.model("project-info",infoschema)
module.exports=infoprjct