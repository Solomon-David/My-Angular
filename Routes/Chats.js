const express = require('express')
const Routes = new express.Router()

function chatfunction(io) {
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
}

module.exports = {
    chatfunction,
    Routes
}