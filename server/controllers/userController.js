const Post = require('../models/postModel');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res
            .status(200).json(users);
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error fetching users", error: err.message });
    }
}

const getById = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.json({message: "no user found"})
    }

    const user = await User.findById(id);

    if (!user) return res.json("no user found");

    res.status(200).json(user);
}


const getPostsByUserId = async (req, res) => { 

    const { id } = req.params;
    
    if (!id) return res.status(400).json({ message: "User ID is required" });
    
    const posts = await Post.find({ author: id });

    res.status(200).json(posts);
}


const updateUser = async (req, res) => { 
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "User ID is required" });

    const { name, email, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, profilePic }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
}


const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Please provide an id" });
    }

    User.findByIdAndDelete(id)
        .then(() => {
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting user", error: err.message });
        });

}

module.exports = {
    getAllUsers,
    deleteUser,
    getById,
    getPostsByUserId,
    updateUser
}