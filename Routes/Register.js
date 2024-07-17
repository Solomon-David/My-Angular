const express = require('express')
const User = require('../Model/User')
const RegisterRouter = new express.Router()

RegisterRouter.post("/register", async function(req,res){
    try{
        const {password,username} = req.body
        const user = await User.findOne({username})
        if(user){
            res.send('username already used')
        }
        const newUser = new User({
            password,
            username
        })
        await newUser.save()
        console.log(username)
        res.send('Register succcessful')
    }
    catch(err){
        console.log(err)
    }
})

module.exports = RegisterRouter