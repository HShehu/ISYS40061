const express = require('express')
const authRoutes = require('./routes/auth')
const passportRun = require('./passport')
const passport = require('passport')
const session = require('express-session')
const parser = require('body-parser')
require('dotenv').config()
require('./config/database')

const app = express()
app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'));

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:1000*60*60*24
     }
}))

app.use(passport.initialize())
app.use(passport.session())

//import auth routes from auth.js
app.use('/auth',authRoutes)

app.use(parser.json())

app.get('/',(req,res,next)=>{
    res.render('home')
   /*  fetch('http://prpoject-api-1:8000/listStock')
    .then((response)=>response.json())
    .then((data)=>res.send(data)) */

})

app.listen(3000)