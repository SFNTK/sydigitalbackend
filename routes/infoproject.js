const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const appointment=require('../models/appointments')

const fs = require('fs');

const sendemail=require("../emails/mail")

const path = require('path');
imagettl = []
logo=""

errorImagelogo = false;
errorImages = false;
const multer = require('multer');

const firstlogo = multer.diskStorage({
    destination: (req, file, cb) => {
        // Separate directories based on `fieldname`
        if (file.fieldname === "logo") {
            cb(null, "./assets/logos"); // Save logos in the 'uploads/logos' folder
        } else if (file.fieldname === "images") {
            cb(null, "./assets/images"); // Save posts in the 'uploads/posts' folder
        } else {
            cb(new Error("Invalid field name"), null); // Handle unexpected fields
        }
    },
    filename: (req, file, callback) => {
        // let nameofpicture = `${req.body.username}-${Date.now()}.${file.mimetype.split("/")[1]}`;
        let nameofpicture = `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}.${file.mimetype.split("/")[1]}`;
       
if(file.fieldname==="images"){
    imagettl.push(nameofpicture)
}else{
    logo=nameofpicture
}

      
        callback(null, nameofpicture)

    }
})

const upload = multer({
    storage: firstlogo,
    fileFilter: (req, file, cb) => {
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and JPEG are allowed."));
        }
    },
});

const firstimages = multer.diskStorage({
    destination: "./assets/images",
    filename: (req, file, callback) => {
        // let nameofpicture = `${req.body.username}-${Date.now()}.${file.mimetype.split("/")[1]}`;


        let nameofpicture = `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}.${file.mimetype.split("/")[1]}`;
        imagettl.push(nameofpicture)
        callback(null, nameofpicture)

    }
})

const checklogo = multer({
    storage: firstlogo,
    fileFilter: (req, file, cb) => {
        const typesvalidated = ["jpg", "png", "jpeg", "webm", "webp"]
        if (typesvalidated.includes(file.mimetype.split("/")[1])) {
            cb(null, true)
        } else {
            errorImagelogo = true
            cb(null, false)
        }

    }
})

const checkimages = multer({
    storage: firstimages,
    fileFilter: (req, file, cb) => {
        const typesvalidated = ["jpg", "png", "jpeg", "webm", "webp"]
        if (typesvalidated.includes(file.mimetype.split("/")[1])) {
            cb(null, true)
        } else {
            errorImages = true
            cb(null, false)
        }

    }
})

const modelinfo=require('../models/project-info')

const socialmidle=async(req,res,next)=>{
    try{
const social=JSON.parse(req.body.socialmedia)
req.body.socialmedia=social
next()
    }catch(err){
        return res.status(400).json({ message: err.message })
    }
}

router.post("/add",  upload.fields([
    { name: "logo", maxCount: 1 }, // Single logo
    { name: "images", maxCount: 90 }, // Multiple images for posts
]),socialmidle, async (req, res) => {
    if (errorImages == true || errorImagelogo==true) {
        errorImages = false;
        errorImagelogo=false;
        return res.json({ "message": "type error" })
    }
    if (imagettl.length == 0) {
        return res.json({ message: "upload at least one image " })


    }
  
    try {
        const companyname = req.body.companyname
        const oldwebsite = req.body.oldwebsite
        const images = imagettl
        const logo2=logo
        const socialmedia = req.body.socialmedia
        const policies = req.body.policies
      //  const logo = logo
        const projectinfo = await modelinfo({ companyname: companyname, oldwebsite: oldwebsite, images: images, socialmedia: socialmedia, policies: policies,logo:logo2 })
        await projectinfo.save()
        imagettl = []
        logo=""
let imagesarr=[]
for(let i=0;i<images.length;i++){
    imagesarr.push(`https://sydigitalbackend.onrender.com/assets/images/${images[i]}`)
}
let logolink=`https://sydigitalbackend.onrender.com/assets/logos/${logo2}`        
const messagecontact=`project info form data :
        company name : ${companyname}
    
        old website : ${oldwebsite}
    
        policies : ${policies}
    
        social media : ${JSON.stringify(socialmedia)}
    
    les images : ${imagesarr.join(" , ")}

    logo:  ${logolink}
    
        `

        const response = await sendemail(messagecontact,"project informtions form data")
        return res.status(200).json({ "message": "all is good" })
    } catch (err) {
        let path1;
        for (let i = 0; i < imagettl.length; i++) {
            path1 = path.join(__dirname, `../assets/images/${imagettl[i]}`)
            try {
                fs.unlinkSync(path1)
            } catch (err2) {
                imagettl = []
                return res.json({ message: err2.message + " hna" })
            }
        }
        imagettl = []

        path2 = path.join(__dirname, `../assets/logos/${logo}`)
        try {
            fs.unlinkSync(path2)
        } catch (err2) {
            logo = ""
            return res.json({ message: err2.message + " hna" })
        }
   logo=""
        return res.json({ "message": err.message + " hna2" })
    }


})

module.exports = router