const passport = require('passport')
const key = require('./keys')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: key.google.clientID,
    clientSecret: key.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({googleId: profile.id}).then(currentUser=>{
          if(currentUser){
            console.log('Current User:',currentUser.username)
            done(null,currentUser)
          }
          else{
            new User({
                username : profile.displayName,
                googleId : profile.id
              }).save().then(newUser => { 
                  console.log('new User Created:',profile.displayName)
                  done(null,newUser)
            })
          }
      })
      
  }
));