const Post = require("../models/postModel");

const getallposts = async (req, res) => {
    await Post.find()
        .populate("author", "name email profilePic")
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error fetching posts", error: err });
        });
}


const getPostById = async (req, res) => {
    const { id } = req.params;
    await Post.findById(id)
        .populate("author", "name email image profilePic")
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.status(200).json(post);
        })
}


const createPost = async (req, res) => {
    const { title, description, image } = req.body;

    const post = new Post({
        title,
        description,
        image,
        author: req.user.id
    })

    post
        .save()
        .then((savedPost) => {res.status(201).json(savedPost);})
        .catch((err) => {
        res.status(500).json({ message: "Error creating post", error: err });
    });
}


const editPost = async (req, res) => {
    const id = req.params.id;
    const { title, description, image } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if logged-in user is author
        if (post.author.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: "You are not allowed to edit this post" });
        }

        // Update post
        post.title = title;
        post.description = description;
        post.image = image;
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json({ message: "Error updating post" });
    }
}


const deletePost = async (req, res) => {

    try {
        const id = req.params.id;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You don't have access to delete this post" });
        } else {
            await Post.findByIdAndDelete(id);
            res.status(200).json({ message: "Post deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting post" });
    }
}

module.exports = { createPost, getallposts, getPostById, editPost, deletePost };