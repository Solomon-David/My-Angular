const express = require('express')
const Router = new express.Router();
const { getPost, createPost } = require('../controller/Postcontroller');

Router.route('/post').get(getPost).post(createPost)




module.exports = Router