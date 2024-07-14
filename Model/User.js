const {Schema,model} = require('mongoose')

const User = new Schema({
    // timestamps: true,
    username : {
        type: String,
        required: true
    },
    password: {
        type : String,
        required : true,
        min: 6,
        max : 20
    }
})


module.exports = model('user', User)