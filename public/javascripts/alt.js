$(function () {
    
    const socket = io();
    // obteniendo los elementos del DOM

    const $Form= $('#form');
    const $messageBox=$('#input');
    const $actions= $('#actions');
    const $chat=$('#chat');
    


    // eventos
    $Form.submit( e => {
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