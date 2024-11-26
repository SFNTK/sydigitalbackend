const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const contact=require('../models/contact')

const fs = require('fs');

const path = require('path');

router.post("/add",async(req,res)=>{
   try{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const phone=req.body.phone;
    const message=req.body.message;

    const contactmsg=await contact({firstName:firstName,lastName:lastName,email:email,phone:phone,message:message})

    await contactmsg.save()

    return res.status(200).json({ "message": "all is good" })


}catch(err){
    return res.json({ "message": err.message  })
    }

})

module.exports = router