const { Schema, model } = require('mongoose')

const Taskes = new Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = model('tasks', Taskes)