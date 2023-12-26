const socket = io('ws://localhost:3500');

const msgInput = document.querySelector('#message')
const nameInput = document.querySelector('#name')
const chatRoom = document.querySelector('#room')
const activity = document.querySelector('.activity')
const usersList = document.querySelector('.user-list')
const roomList = document.querySelector('.room-list')
const chatDisplay = document.querySelector('.chat-display')



function sendMessage(e){
    e.preventDefault();//submit the form without reloading the page
    if(nameInput.value && msgInput.value && chatRoom.value){ // if the msgInput and name and chat room contains something and not empty
        socket.emit('message' , {
            name: nameInput.value,
            text: msgInput.value
        }); // send the value to the server
        msgInput.value = ''; // reset the msgInput value
    }
    msgInput.focus(); // focus on the msgInput field
}

function enterRoom(e){
    e.preventDefault();
    if(nameInput.value && chatRoom.value){
        socket.emit('enterRoom',{
            name: nameInput.value,
            room: chatRoom.value
        });
    }
}

document.querySelector('.form-msg')
    .addEventListener('submit', sendMessage);
document.querySelector('.form-join')
    .addEventListener('submit', enterRoom);
msgInput.addEventListener('keypress', ()=>{
    socket.emit('activity', nameInput.value)
})
    
// listen for messages from the server

socket.on('message',(data) => {
    activity.textContent =""
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
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