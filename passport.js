const strategy = require('passport-openid-oauth20').Strategy
const passport = require('passport')
require("dotenv").config()

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
        console.log(profile)
      })
    )

