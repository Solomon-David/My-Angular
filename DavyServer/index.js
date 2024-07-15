require('./Model/Mongo')
const express=require("express")
const app=express()
const server=require("http").createServer(app)
const LoginRouter = require('./Routes/Login')
const cors=require("cors")
const socketio=require("socket.io")
const io = socketio(server, {cors:{origin: "*"}} )

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.use('/app',LoginRouter)
app.use(cors({origin:"http://localhost:4200"}))

app.get("*", (req,res)=>{
  res.status(400).send("<h2>Error</h2>")
})

server.listen(3000, ()=>{
    console.log(" server is listening on port 3000")
}) 

io.on("connection", (socket)=>{
   
console.log(`Connection  Established`);

socket.on("message", (message)=>{
    let resp={message: message.message, sender: message.sender}
    console.log(resp)
    io.emit("message", resp)
});

socket.on("disconnect", ()=>{
    console.log(`Connectiion closed`)   
    })
})

