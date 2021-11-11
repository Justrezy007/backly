const passport = require('passport')

const loginPage = (req, res) =>{
    res.render('Login')
}

const loginWithGoogle = passport.authenticate('google',{
    scope: ['profile']
})

const redirectWithGoogle = (req, res) =>{
    res.send('berhasil')
}

const logoutWithGoogle = (req, res) =>{
    res.send('login out with google')
}

module.exports = { loginPage, loginWithGoogle, redirectWithGoogle, logoutWithGoogle}