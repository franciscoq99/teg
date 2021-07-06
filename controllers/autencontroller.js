var conexion = require('../config/conexion');
const express = require('express');


module.exports={

    index: (req,res)=>{
        res.render('authen/registrar.ejs');
    },

    login: (req,res)=>{
        res.render('authen/login.ejs');
    },

    profile: (req,res)=>{
        res.render('authen/profile.ejs'); 
    },

    salir:(req,res) =>{
        req.logOut();
        res.redirect('/login')
    }
}
