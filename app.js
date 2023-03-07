const express = require('express')
const authRoutes = require('./routes/auth')
const passportRun = require('./passport')

const app = express()


app.use('/auth',authRoutes)


app.get('/',(req,res,next)=>{
    res.send("<h1>Login</h1>")
})



app.listen(3000)