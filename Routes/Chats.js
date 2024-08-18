const express = require('express')
const app = express()
const socketio = require('socket.io')
const { server } = require('../index')
const cors = require("cors")
const io = socketio(server, { cors: { origin: "*" } })
const Routes = new express.Router()

app.use(cors({ origin: "*" }))

Routes.get('chatHome', async (req, res) => {
    res.send('chatpage')
})

io.on("connection", (socket) => {
    console.log(`Connection  Established`);

    socket.on("send-message", (message, room) => {
        if (room == '') {
            socket.broadcast.emit('recieve-message', message)
        }
        else {
            socket.to(room).emit('recieve-message', message)
        }
        socket.on('join-room', (room, cb) => {
            socket.join(room)
            cb(`joined ${room} successful`)
        })
    });

    socket.on("disconnect", () => {
        console.log(`Connection closed`)
    })
})
module.exports = Routes