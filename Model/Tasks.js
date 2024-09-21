const { Schema, model, Types } = require('mongoose')

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
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "Please provide usercreatedBy"]
    }
}, { timestamps: true })

module.exports = model('tasks', Taskes)