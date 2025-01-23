require('./Model/Mongo')
const Auth = require('./Middleware/Auth')
require('dotenv').config()
const express = require("express")
const DashBoardRouter = require('./Routes/Dashboard')
const taskRoute = require('./Routes/TaskRoutes')
const app = express()
const PostRoutes = require("./Routes/PostRoutes")
const AuthenticateRouter = require('./Routes/Authenticate')
const { chatfunction, Routes: chatRoutes } = require('./Routes/Chats')
const server = require("http").createServer(app)
const socketIo = require('socket.io')
const cors = require('cors')
const io = socketIo(server, { cors: { origin: "*" } })
const cookieparser = require('cookie-parser')
const errorMiddleware = require('./error/errorHandler')

// Temporary modules
const User = require("./Model/User")
const post = require('./Model/post')

// Using Sockets 
chatfunction(io)
// middlewares 
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())
app.use(express.static('./public'))
app.use(errorMiddleware)


//Routes

app.use('/app', AuthenticateRouter)
app.use('/app', Auth, chatRoutes)
app.use('/app', Auth, PostRoutes)
app.use('/app', Auth, DashBoardRouter)
app.use('/app', Auth, taskRoute)


const PORT = process.env.PORT || 8000;

app.get("/user", async (req, res) => {
  const userspresent = await User.countDocuments();
  await post.deleteMany();
  res.status(200).json({ userspresent })
})

app.get("*", (req, res) => {
  res.status(400).send(`<h2>Error. ${req.originalUrl} route does not exist</h2>`)
})
// Connecting to a server
server.listen(8000, () => {
  console.log(`Server is listening on ${PORT}`)
})
