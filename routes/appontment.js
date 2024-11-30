const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const appointment = require('../models/appointments')

const fs = require('fs');
const sendemail = require("../emails/mail")
const path = require('path');

router.post("/add", async (req, res) => {
    try {
        const name = req.body.name;
        const companyname = req.body.companyname;
        const email = req.body.email;
        const plan = req.body.plan;
        const message = req.body.message;
        const pages = req.body.pages;

        const booking = await appointment({ name: name, companyname: companyname, email: email, plan: plan, message: message, pages: pages })

        await booking.save()
        const pagesstring = pages.join(' , ');
        const messagecontact = `appointement form data :

    Name : ${name}

    Company Name : ${companyname}

    email : ${email}

    plan : ${plan}

    message : ${message}

    pages : ${pagesstring}
    `
        const response = await sendemail(messagecontact, "booking form data")
        return res.status(200).json({ "message": "all is good" })


    } catch (err) {
        console.log(err)
        console.log(err.message)
        return res.status(400).json({ "message": err.message })
       
    }

})




module.exports = router