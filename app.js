const express = require('express')
const authRoutes = require('./routes/auth')
const passportRun = require('./passport')
const passport = require('passport')
const session = require('express-session')
const parser = require('body-parser')
const User = require('./models/user-model')
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

app.use(passport.session())

//import auth routes from auth.js
app.use('/auth',authRoutes)

app.use(parser.json())
app.use(express.urlencoded())

const authCheck = (req,res,next) =>{
    if(!req.user){
        res.redirect('auth/login')
    }
    else{
        next()
    }
}

app.use(authCheck)
app.get('/',(req,res)=>{

     fetch('http://prpoject-api-1:8000/listStock')
     .then((response)=>response.json())
     .then((data)=>res.render('home',{stocks:data.stocks,user:req.user}))
     .catch((error) => {
        console.error("Error:", error)
      })
})

app.post('/addMoney',(req,res)=>{

    var number = req.body.demo
    number = parseInt(number)
    if (isNaN(number))
   {
    console.log("Numbers only");
   }
    else
   {
   if (number == 0)
      {
      console.log("The number is zero");
      }
   else if (number<0)
      {
      console.log("Must be positive");
      }
   else
      {
        console.log('Here')
        User.findByIdAndUpdate(req.user.id,{walletUSD:req.user.walletUSD+number})
        .then(res.redirect('/'))
        .catch((err)=>{res.send(err)})
      }
   }
})

app.listen(3000)