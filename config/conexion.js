var mysql = require('mysql');
var {promisify} = require('util');
const {database}=require('./keys.js')

var conexion = mysql.createPool(database);

conexion.getConnection((error, connection) => {
    if(error){
        throw error;
    }   
    
    if(connection){ 
        console.log('CONEXION EXITOSA WEY ;-D')
    }
    return;
});

conexion.query = promisify(conexion.query);

module.exports=conexion;