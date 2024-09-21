const { Schema, model, Types } = require("mongoose")

const post = new Schema({
    post: {
        type: String,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        required: [true, "Please who posted this"]
    },
    comment: [{
        type: String
    }]
}, { timestamps: true })


module.exports = model('Post', post)