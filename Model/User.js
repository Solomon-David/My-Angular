const {Schema,model} = require('mongoose')
const crypto = require("crypto")

const User = new Schema({
    firstname: {
        type: String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    username : {
        type: String,
        required: true
    },
    password: {
        type : String,
        required : true,
        min: 6,
        max : 20
    },
    email : {
        type : String,
        required : true,
        validator(value){

        }
    }
},
{timestamps: true})

User.pre('save', async function(next){
    try{
    const user = this
    user.password = crypto.createHash(user.password, 8)
    next()
    }
    catch(err){
        console.log(err)
    }
})

module.exports = model('user', User)