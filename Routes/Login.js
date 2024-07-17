const express = require('express')
const User = require('../Model/User')
const LoginRouter = new express.Router()

LoginRouter.post("/login", async function(req,res){
    try{
        const {password,username} = req.body
        
        const user = await User({
            password,
            username
        })
        await user.save()
        console.log(username,password)
        res.send('Login succcessful')
    }
    catch(err){
        console.log(err)
    }
})

module.exports = LoginRouter