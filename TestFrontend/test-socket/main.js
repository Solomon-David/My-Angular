import { io } from "socket.io-client";
const roominput= document.getElementById('room');
const form = document.getElementById('form')
const joinButton = document.getElementById("room-button")

const message= document.querySelector('#input')
const socket = io('http://localhost:8000')
 
socket.on('connect' ,()=>{
    displayMessage(`your socket id is ${socket.id}`)
})
socket.on('recieve-message',message=>{
    displayMessage(message)
})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const messagevalue = message.value
    const roomvalue = roominput.value
    if(messagevalue== '') return
    displayMessage(messagevalue)
    message.value = ''

    socket.emit('send-message',messagevalue, roomvalue)
})
joinButton.addEventListener('click',()=>{
    const rooms =  roominput.value
    socket.emit('join-room', rooms, messages =>{
        displayMessage(messages)
    })
})


function displayMessage(message){
    const div = document.createElement('div')
    div.textContent = message
    document.getElementById("app").appendChild(div)
}
