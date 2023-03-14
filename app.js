const express = require('express')
const authRoutes = require('./routes/auth')
const passportRun = require('./passport')
const passport = require('passport')
const session = require('express-session')
const parser = require('body-parser')
const mongoose = require('mongoose')
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
     .then((data)=>{
        
        res.render('home',{stocks:data.stocks,user:req.user})    
    })
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
        User.findByIdAndUpdate(req.user.id,{walletUSD:req.user.walletUSD+number})
        .then(res.redirect('/'))
        .catch((err)=>{res.send(err)})
      }
   }
})



app.get('/stock/:symbol',(req,res)=>{

    fetch('http://prpoject-api-1:8000/listStock')
     .then((response)=>response.json())
     .then((data)=>{
        res.render('buyStock',{
            stock:data.stocks.find(({symbol})=>symbol === req.params.symbol),
            user:req.user
        })
     })
     .catch((error) => {
        console.error("Error:", error)
      })
})
app.post('/buyStocks/:symbol',(req,res)=>{
    console.log(req.params.symbol)
    fetch('http://prpoject-api-1:8000/listStock')
    .then((response)=>response.json())
    .then((data)=>data.stocks.find(({symbol})=>symbol === req.params.symbol))
    .then((stock)=>{
        //check if user has enough money
        if(req.user.walletUSD >= (req.body.cost * stock.price).toFixed(2)){
            //check if there is enough shares
            if(stock.availableShares>=req.body.cost){
              fetch(`http://prpoject-api-1:8000/buyStock?stockSym=${stock.symbol}&amount=${parseInt(req.body.cost)}`,{method:"PUT"})
              .then(console.log('Done with api ......... Appending Database..........'))
              .catch((error)=>console.log("Error:",error))
              
              purchase = {
                companyName: stock.name,
                companySymbol: stock.symbol,
                sharesBought: req.body.cost
                }

                //add to User
                User.findOne({googleId:req.user.googleId})
                .then((user) => {


                    //create share
                    var exists = false
                    
                    for(let i = 0 ;i<user.shares.length;i++){
                        //check if entry exists in array
                        if(user.shares[i].companySymbol == stock.symbol){
                            //get the array to a tmp array
                            user.shares.at(i).sharesBought += parseInt(req.body.cost) 
                            exists = true
                            break
                        }
                    }

                    if(exists == false){
                        user.shares.push(purchase)
                    }
                    
                    user.walletUSD -= (req.body.cost * stock.price).toFixed(2)
                    user.save()
                })
                .catch((error) => console.log('Error:',error))
                res.redirect('/')
            }
        }
    })
    .catch((error) => {
       console.error("Error:", error)
     })
})


app.listen(3000)