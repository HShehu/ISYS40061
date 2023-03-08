const express = require('express')
const authRoutes = require('./routes/auth')
const passportRun = require('./passport')
require('./config/database')

const app = express()

//import auth routes from auth.js
app.use('/auth',authRoutes)


app.get('/',(req,res,next)=>{
    res.send("<h1>Login</h1>")
})



app.listen(3000)