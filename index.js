require('dotenv').config()
const express = require('express')
const app = express()
let router = require('./router/routes')

app.use(express.json({limit:'100gb'}))
app.use(express.urlencoded({extended:true, limit:'100gb'}))
app.use("/",router)

app.listen(3300)