require('./Model/Mongo')
const Auth = require('./Middleware/Auth')
require('dotenv').config()
const express = require("express")
const DashBoardRouter = require('./Routes/Dashboard')
const taskRoute = require('./Routes/TaskRoutes')
const app = express()
const ChatsRouter = require('./Routes/Chats')
const server = require("http").createServer(app)
const AuthenticateRouter = require('./Routes/Authenticate')

// middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

//Routes

app.use('/app', AuthenticateRouter)
app.use('/app', Auth, DashBoardRouter)
app.use('/app', Auth, taskRoute)
app.use('/app/home', ChatsRouter)

const PORT = process.env.PORT || 8000;
app.get("*", (req, res) => {
  res.status(400).send(`<h2>Error. ${req.originalUrl} route does not exist</h2>`)
})

// Connecting to a server
server.listen(8000, () => {
  console.log(`Server is listening on ${PORT}`)
})

module.exports = { server }