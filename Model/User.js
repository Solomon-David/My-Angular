const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require("bcryptjs")

const User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    }
},
)

User.pre('save', async function (next) {
    try {
        const user = this
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
    }
    catch (err) {
        console.log(err)
    }
})
User.methods.createJwt = function () {
    return jwt.sign({ userId: this._id, username: this.username }, process.env.SECRET_PHASE, { expiresIn: process.env.LIFE_TIME })

}
User.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = model('User', User)