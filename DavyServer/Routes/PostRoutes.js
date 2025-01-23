const express = require('express')
const Router = new express.Router();
const { getPost, createPost, createComments, getspecificPost, likes, deletePost, updatePost } = require('../controller/Postcontroller');
const upload = require('../Middleware/upload');

Router.route('/posts').get(getPost).post(createPost)
Router.route('/post/:postId').get(getspecificPost).delete(deletePost).patch(updatePost)
Router.route('/post/:postId/likes').post(likes)
Router.route('/post/:postId/comment').post(createComments)




module.exports = Router