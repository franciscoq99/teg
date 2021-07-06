    document.getElementById("btn-iniciar-sesion-docente").addEventListener("click", IniciarSesiondocente);
    document.getElementById("btn-iniciar-sesion-estudiante").addEventListener("click", IniciarSesionestudiante);
    window.addEventListener("resize", anchoPagina);

    //variables
    let contenedor_login_register= document.querySelector(".contenedor-login-register");
    let formulario_login_estudiante=document.querySelector(" .formulario-login-estudiante");
    let formulario_login_docente=document.querySelector(".formulario-login-docente");
    let caja_trasera_login_estudiante=document.querySelector(".caja-trasera-login-estudiante")
    let caja_trasera_login_docente=document.querySelector(".caja-trasera-login-docente")


    function anchoPagina(){
        if(window.innerWidth > 800){
            caja_trasera_login_estudiante.style.display="block";
            caja_trasera_login_docente.style.display="block";

        }
        else{
        caja_trasera_login_docente.style.display="block";
        caja_trasera_login_docente.style.opacity="1";
        caja_trasera_login_estudiante.style.display="none";
        formulario_login_estudiante.style.display="block";
        formulario_login_docente.style.display="none";
        contenedor_login_register.style.left="0px";

        }
    }
    anchoPagina();

    function IniciarSesionestudiante(){
        if(window.innerWidth > 800){
        formulario_login_docente.style.display="none";
        contenedor_login_register.style.left="20px";
        formulario_login_estudiante.style.display="block";
        caja_trasera_login_docente.style.opacity ="1";
        caja_trasera_login_estudiante.style.opacity="0";
        }
        else{
        formulario_login_docente.style.display="none";
        contenedor_login_register.style.left="0px";
        formulario_login_estudiante.style.display="block";
        caja_trasera_login_docente.style.display = "block";
        caja_trasera_login_estudiante.style.display="none";
        }
    }
    function IniciarSesiondocente(){
        if(window.innerWidth > 800){
        formulario_login_docente.style.display="block";
        contenedor_login_register.style.left="420px";
        formulario_login_estudiante.style.display="none";
        caja_trasera_login_docente.style.opacity ="0";
        caja_trasera_login_estudiante.style.opacity="1";
        }
        
        else{
        formulario_login_docente.style.display="block";
        contenedor_login_register.style.left="0px";
        formulario_login_estudiante.style.display="none";
        caja_trasera_login_docente.style.display ="none";
        caja_trasera_login_estudiante.style.display="block";
        caja_trasera_login_estudiante.style.opacity="1";
        }
    }


