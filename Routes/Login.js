const express = require('express')
const User = require('../Model/User')
const LoginRouter = new express.Router()

LoginRouter.post("/login", async function(req,res){
    try{
        const {password,username} = req.body

        const newUser = new User({
            password,
            username
        })
        await newUser.save()
        console.log(username)
        res.send('Login succcessful')
    }
    catch(err){
        console.log(err)
    }
})

module.exports = LoginRouter