const express = require('express')
const { redirect } = require('statuses')
const passportSetup = require('./config/passportSetup')
const mongoose = require('mongoose')
const key = require('./config/keys')
const passport = require('passport')
const cookieSession = require('cookie-session')

const authRouter = require('./routes/auth')

const app = express()

// setup view engine
app.set('view engine','ejs')

// Cookie lifetime
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: key.cookieKey.secret
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session())


// connect ke database
mongoose.connect(key.mongoDB.uri,()=>{
    console.log('connected to database')
})

app.get('/',(req, res)=>{
    res.render('Home')
})

//  Router untuk Authentication
app.use('/auth',authRouter)

app.listen(3000,()=>{
    console.log('Listening to port 3000')
})