const express = require('express')
const authRoutes = require('./routes/auth')
const passportRun = require('./passport')
//require('./config/database')

const app = express()

//import auth routes from auth.js
app.use('/auth',authRoutes)


app.get('/',(req,res,next)=>{
    fetch('http://prpoject-api-1:8000')
    .then((response) => response.json())
    .then((data) => res.send(data))
    
})



app.listen(3000)