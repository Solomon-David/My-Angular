const express=require("express")
const app=express()
const server=require("http").createServer(app)
const cors=require("cors")
const socketio=require("socket.io")
const io = socketio(server, {  cors:{origin: "*"} } )

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use()
app.use(cors({origin:"http://localhost:4200"}))

app.get("/", (req,res)=>{
    // res.send("What do you want?")
    res.send(`
    <!doctype html>
    <html>
        <head>
            <title>Loaded</title>
            <script src='/socket.io/socket.io.js'></script>
            <script >
                var socket=io();
            </script>
        </head>
        <body>
            Hello <b>User</b>
        </body>
    </html>
    `)
})

app.post("/login", function(req,res){
    let username=req.body.username
    let password=req.body.password
    let loggedin=false
    let result=new Object({accepted: Boolean,
        data: Object})
    
    console.log(`username: ${username}`)
    console.log(`password: ${password}`)
    if((username=="Solomon") && (password=="The formula")){
        console.log("Matched")
        loggedin=true
        let data={
            fname: "SolomonDavid",
            username: "Solomon",
            lname:"Akeso",
            role: "Admin",
            country:"Nigeria"
            }
        result.data=data
    }
    else if((username=="Judy") && (password=="Love")){
        console.log("Matched")
        loggedin=true
        let data={
            fname: "Judith",
            username: "Judy",
            lname:"Evans",
            role: "User",
            country:"Nigeria"
        }
        result.data=data
    }
    else{
        console.log("Not matched")
        loggedin=false

    }

    result.accepted=loggedin
    console.log(result)
                
    res.json(result)
})

server.listen(8080, ()=>{
    console.log("I'm working!")
}) 



io.on("connection", (socket)=>{
   
        console.log(`Connection  Established`);
   

  
        
    socket.on("message", (message)=>{
        let resp={message: message.message, sender: message.sender}
        console.log(resp)
        io.emit("message", resp)
    });


    socket.on("disconnect", ()=>{
        console.log(`Connectin closed`)
        
    })

})

