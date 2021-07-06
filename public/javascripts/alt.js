$(function () {
    
    const socket = io();
    // obteniendo los elementos del DOM

    const $Form= document.getElementById('form');
    const $messageBox=document.getElementById('input');
    const $actions= document.getElementById('actions');
    const $chat=document.getElementById('chat');
    // const users= user.nombre;


    // eventos
    $Form.addEventListener('submit', function(e) {
    e.preventDefault();
    if ($messageBox.value) {
      socket.emit('send message', $messageBox.value);
      $messageBox.value = '';
    }
  });


    // $messageBox.addEventListener('keypress' function(){
    //     console.log(users);
    //     socket.emit('chat typing',users.value);
    // })

    socket.on('new message', (data)=>{
        var item = document.createElement('li');
        item.textContent = data;
        $chat.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }); 
})