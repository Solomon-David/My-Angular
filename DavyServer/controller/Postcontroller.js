const { postModel, commentModel } = require('../Model/post')
const multer = require('multer');

const getPost = async (req, res) => {
    try {
        const { userId } = req.user
        const allPost = await postModel.find({ author: userId })
        res.status(200).json({ allPost })
    }
    catch (err) {
        res.status(500).json({ err })
    }

}
const getspecificPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const getPost = await postModel.findById({ _id: postId }).populate('comments')
        return res.status(200).json({ posts: getPost })
    } catch (err) {
        console.log(err)
    }
}
const createPost = async (req, res) => {
    const { userId, username } = req.user
    req.body.author = userId

    const newPost = await postModel.create(req.body)
    res.status(201).json({ newPost })
}
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const updatedpost = await postModel.findByIdAndUpdate({ _id: postId }, req.body, { new: true, runValidators: true })
        if (!updatedpost) {
            return res.status(400).json({ msg: "Post does not exist" });
        }
        return res.status(201).json({ updatedpost })
    } catch (err) {
        res.status(500).json({ msg: "internal server error" })
    }

}
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const deletedPost = await postModel.findOneAndDelete({ _id: postId }, { new: true, runValidators: true });
        if (!deletedPost) {
            return res.status(400).json({ msg: `Post with id ${postId} does not exist` })
        }
        return res.status(200).json({ deletedPost })
    } catch (err) {

    }
}
const createComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.user
        const Post = await postModel.findById({ _id: postId });
        if (!Post) {
            return res.status(400).json({ error: "Post not found" })
        }
        req.body.author = userId
        req.body.post = postId
        const comments = await commentModel.create(req.body)
        Post.comments.push(comments._id)
        await Post.save()
        return res.status(201).json({ comments })
    }
    catch (err) {
        res.status(500).json({ err })
    }

}
const likes = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.user
    const postLiked = await postModel.findOne({ _id: postId });
    if (!postLiked) {
        return res.status(400).json({ error: "This Post does not exist" })
    }
    const hadLiked = await postLiked.likedBy.includes(userId);
    if (hadLiked) {
        postLiked.likedBy = postLiked.likedBy.filter((users) => (
            users.toString() !== userId
        ))
        postLiked.likes -= 1
        await postLiked.save();
        return res.status(200).json({ message: "Post unliked", postlikes: postLiked.likes })
    }
    postLiked.likedBy.push(userId)
    postLiked.likes += 1
    await postLiked.save()
    res.status(200).json({ message: "Post liked", postlikes: postLiked.likes })
}


module.exports = {
    getPost,
    createPost,
    getspecificPost,
    updatePost,
    deletePost,
    createComments,
    likes
}