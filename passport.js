const strategy = require('passport-openid-oauth20').Strategy
const passport = require('passport')

passport.use(
    "google",
    new OpenIdOAuth2Strategy(
      {
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenURL: "https://www.googleapis.com/oauth2/v4/token",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://www.example.net/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate(
          { providerId: profile.id, provider: profile.provider },
          function(err, user) {
            return cb(err, user);
          }
        );
      }
    )
  )

