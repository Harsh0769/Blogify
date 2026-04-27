const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require("../models/userModel");



const signup = async (req, res) => {

    const { name, email, password, role, profilePic } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Please provide all required fields" });
    } else {

        const hashedPassword = await bcrypt.hash(password, 10);

        User.create({
            name,
            email,
            password: hashedPassword,
            role,
            profilePic : profilePic || undefined
        })
            .then(user => {
                res.status(201).json({ message: "User created successfully", user });
            })
            .catch(err => {
                res.status(500).json({ message: "Error creating user", error: err.message });
            });
        
    }
}


const login = async (req, res) => {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all required fields & incorrect entries" });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    } else {
        const token = JWT.sign(
        { id: findUser._id, role: findUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        )
        
        //cookie-creation
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        });

        return res.json({
            message: "Login successful",
            token,
            user: findUser
        });
    }
}


const logout = (req, res) => {
    res.clearCookie("token").json({ message: " logged out succesfully" })
}


const verifier = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user); 
    } catch (err) {
        res.status(500).json({ message: "Error fetching user" });
    }
}


module.exports = {
    signup,
    login,
    verifier,
    logout
};