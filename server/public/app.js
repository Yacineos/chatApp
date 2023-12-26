const socket = io('ws://localhost:3500');

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')


function sendMessage(e){
    e.preventDefault();//submit the form without reloading the page
    if(msgInput.value){ // if the msgInput value is not empty
        socket.emit('message' , msgInput.value); // send the value to the server
        msgInput.value = ''; // reset the msgInput value
    }
    msgInput.focus(); // focus on the msgInput field
}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// listen for messages from the server

socket.on('message',(data) => {
    activity.textContent =""
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})

msgInput.addEventListener('keypress', ()=>{
    socket.emit('activity', socket.id.substring(0,5))
})

let activityTimer ;

socket.on('activity', (name)=>{
    activity.textContent = `${name} is typing...`
    // clear after 2 secondes
    clearTimeout(activity);
    activityTimer = setTimeout(() => {
        activity.textContent = "";
    },2000) 
})