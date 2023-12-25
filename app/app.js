const socket = new WebSocket('ws://localhost:3000');

function sendMessage(e){
    e.preventDefault();//submit the form without reloading the page
    const input = document.querySelector('input'); // select the input element
    if(input.value){ // if the input value is not empty
        socket.send(input.value); // send the value to the server
        input.value = ''; // reset the input value
    }
    input.focus(); // focus on the input field
}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// listen for messages from the server

socket.addEventListener('message',({data}) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})