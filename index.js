require('dotenv').config()
const express = require('express')
const app = express()
let router = require('./router/routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",router)

app.listen(3300)