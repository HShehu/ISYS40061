const router = require('express').Router()
const passport = require('passport')

router.get('/login',(req,res)=>{
    res.send('<a href="http://localhost:3000/auth/google">Login</a>')
})

//google
router.get('/google',passport.authenticate('google',{
   scope:['profile'] 
}))

router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.send("YAta")
})

module.exports = router