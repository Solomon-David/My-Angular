const { Schema, model, Types } = require("mongoose")

const post = new Schema({
    post: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "Please have an author for this?"]
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        type: Types.ObjectId,
        ref: "comments"
    }]
})

const comments = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Types.ObjectId,
        ref: "post"
    },
    replies: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    }
})

post.pre('save', function (next) {
    this.updatedAt = Date.now
    next()
})
const commentModel = model('comments', comments)
const postModel = model('Posts', post)

module.exports = {
    postModel,
    commentModel
}