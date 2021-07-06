module.exports= function(io){
    
    io.on('connection', (socket) => { 
    console.log('usuario conectado WS :-)', socket.id);

    socket.on('send message', (data)=> {
        io.sockets.emit('new message', data);
    }); 
    socket.on('chat typing',(username)=>{
    console.log(username);
    });

});

}