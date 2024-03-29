const strategy = require('passport-openid-oauth20').Strategy
const passport = require('passport')
const User = require('./models/user-model')
require("dotenv").config()

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user)
  })
})

//create Google Strategy for Oauth2 + OpenID
passport.use(
  "google",
  new strategy(
    {
      authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenURL: "https://www.googleapis.com/oauth2/v4/token",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: '/auth/google/redirect'
    },(accessToken, refreshToken, profile, done)=>{
      
      User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
          done(null,currentUser)
        } else {
          new User({
            username:profile.displayName,
            googleId:profile.id
          }).save().then((newUser)=>{
            done(null,newUser)
          })
        }
      })
  })
)

