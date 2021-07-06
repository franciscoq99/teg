var express = require('express');
var router = express.Router();
const passport = require('passport');
const authorize = require("../middleware/authentication");

const authencontroller = require('../controllers/autencontroller');
/* GET page. */
router.get('/registrarse', authorize(), authencontroller.index);

router.get('/login', authorize(), authencontroller.login); 

router.get('/profile', authencontroller.profile);

router.get('/logout', authencontroller.salir);
//POST page

//signup estudiante //signup docente
router.post('/signup-estudiante', passport.authenticate('local.signup-estudiante', {
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
    })
);

router.post('/signup-docente', passport.authenticate('local.signup-docente', {
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
}));

//login estudiante //login docente
router.post('/login-estudiante', (req,res, next)=>{
    passport.authenticate('local.login-estudiante',{
        successRedirect:'/profile',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
});

router.post('/login-docente',(req,res, next)=>{
    passport.authenticate('local.login-docente',{
        successRedirect:'/profile',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
});



module.exports = router;