const PostModel = require('../Model/post')
const getPost = async (req, res) => {
    res.send("Post routes get")
}

const createPost = async () => {
    res.send('created!!!')
}
module.exports = {
    getPost,
    createPost
}