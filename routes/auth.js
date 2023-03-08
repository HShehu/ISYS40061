const router = require('express').Router()
const passport = require('passport')

router.get('/login',(req,res)=>{
    res.send('<a href="http://localhost:3000/auth/google">Login</a>')
})

//route to direct for login
router.get('/google',passport.authenticate('google',{
   scope:['profile'] 
}))

//route to get profile through backchannel
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.send("YAta")
})

module.exports = router