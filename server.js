const express=require("express")
const app=express()
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');


app.use(cors())
app.listen(3001)
const path=require("path")
app.use("/assets",express.static(path.join(__dirname,"assets")))

require("./connection/connection")

const routercontact=require("./routes/contact")
app.use('/contact',routercontact)

const routerappointment=require("./routes/appontment")
app.use('/appointment',routerappointment)

const routerproject=require("./routes/infoproject")
app.use('/project',routerproject)
