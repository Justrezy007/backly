const express = require('express')
const router =  express.Router()
const passport = require('passport')

const authController = require('../controllers/auth')

// Menampilkan halaman Login
router.get('/login', authController.loginPage)

// Masuk dengan Google
router.get('/google', authController.loginWithGoogle)

// Redirect callback Google
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.send(req.user)
})

// Keluar dengan Google
router.get('/logout', authController.logoutWithGoogle)

module.exports = router