const mongoose=require("mongoose")

const infoschema=new mongoose.Schema({
    companyname:{
        type:String,required:true
    },   oldwebsite:{
        type:String,required:false
    },   logo:{
        type:String,required:false
    },   images:{
        type:[String],required:false
    }   ,socialmedia:{
        type:[{name:String,link:String}],required:false
    },   policies:{
        type:String,required:false
    }

},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}})

const infoprjct=mongoose.model("project-info",infoschema)
module.exports=infoprjct