const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/conexion');
const helpers= require('../config/helpers');

//Para iniciar Sesion estudiante
passport.use('local.login-estudiante', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true 

}, async (req,username,password,done)=>{
    
    const rows= await pool.query('SELECT * FROM alumno WHERE username = ? ', [username] );

        if(rows.length > 0){
            const user = rows[0];
            const valiusPass= await helpers.matchPassword(password, user.password);
            
            if(valiusPass){
                done(null, user, req.flash('success','Bienvenido'+user.nombre));

            }else{ 
                done(null,false,req.flash('message','Contraseña Incorrecta'));
            }
        }else{
            return done(null, false, req.flash('message','Usuario No Existe'))
        }

}));
//Para iniciar Sesion profesor
passport.use('local.login-docente', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true 

}, async (req,username,password,done)=>{
    
    const rows= await pool.query('SELECT * FROM docente WHERE username = ? ', [username] );
        if(rows==='admin'){
            const valiusPass= await helpers.matchPassword(password, user.password);
            if(valiusPass){
                done(null, user, req.flash('success','Bienvenido'+user.nombre));
                res.render('profile-admin.hbs');
            } 
        }
        if(rows.length > 0){
            const user = rows[0];
            const valiusPass= await helpers.matchPassword(password, user.password);
            
            if(valiusPass){
                done(null, user, req.flash('success','Bienvenido'+user.nombre));

            }else{ 
                done(null,false,req.flash('message','Contraseña Incorrecta'));
            }
        }else{
            return done(null, false, req.flash('message','Usuario No Existe'))
        }

}));

//Para Registrarse estudiante
passport.use('local.signup-estudiante', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password, done) => {

    function role() {
        const rol = 'alumno';
        return rol;
    };
    const rol =role();
    const {nombre} = req.body;
    const {apellido} = req.body;
    const {email} = req.body;
    const newUser= {    
        nombre,
        apellido,
        username, 
        password,
        rol,
        email
    };
    try {
        const consultarUsuario = await pool.query('SELECT * FROM alumno WHERE username = ?', [username]);
        if (consultarUsuario.length)        
        return done(null, false, req.flash('message','Usuario Ya Existente'))
        newUser.password= await helpers.encryptPassword(password);
        const result= await pool.query('INSERT INTO alumno set ?', [newUser] );
        newUser.id_alumno = result.insertId ;
        return done(null,newUser);
    } catch (error) {
        console.error(error) 
    }

})); 

//docente
passport.use('local.signup-docente', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password, done) => {

    function role() {
        const rol = 'docente';
        return rol;
    };

    const rol =role();
    const {nombre} = req.body;
    const {apellido} = req.body;
    const {email} = req.body;
    const newUser= {    
        nombre,
        apellido,
        username, 
        password,
        rol,
        email

    };
    try {
        const consultarUsuario = await pool.query('SELECT * FROM docente WHERE username = ?', [username]);
        if (consultarUsuario.length)
            return done(null, false, req.flash('message','Usuario Ya Existente'))
        newUser.password= await helpers.encryptPassword(password);
        const result= await pool.query('INSERT INTO docente set ?', [newUser] );
        newUser.id_alumno = result.insertId ;
    return done(null,newUser);
    } catch (error) {
        console.error(error)
    }

}));

//otra cosa alumno
passport.serializeUser((user, done) => {
    done(null, user.id_alumno);
});

passport.deserializeUser( async(id_alumno,done) =>{
    const rows =await pool.query('SELECT * FROM alumno Where id_alumno = ?', [id_alumno]);
    done(null, rows[0]);
});

//docente
passport.serializeUser((user, done) => {
    done(null, user.id_docente);
});

passport.deserializeUser( async(id_docente,done) =>{
    const rows =await pool.query('SELECT * FROM docente Where id_docente = ?', [id_docente]);
    done(null, rows[0]);
});