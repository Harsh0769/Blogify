const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getById, getPostsByUserId, updateUser } = require('../controllers/userController');
const authMiddleware = require("../middleware/authmiddleware");
const { authRoles } = require("../middleware/authRoles");

router
    .get('/getusers', authMiddleware, authRoles("admin"), getAllUsers)
    //Admin Route
    //we can see all the users in this route

    .get("/:id", authMiddleware, authRoles("admin", "user"), getById)
    //Admin Route
    //we can see a specific user's details in this route

    .get("/posts/:id", authMiddleware, authRoles("admin", "user"), getPostsByUserId)
    //Admin Route
    //we can see all the posts of a specific user in this route
    
    .put("/update/:id", authMiddleware, authRoles("admin", "user"), updateUser)
    //Admin & User Route
    //we can update a user's details in this route

    .delete('/delete/:id', authMiddleware, authRoles("admin"), deleteUser);
    //Admin Route
    //we can delete a user in this route


module.exports = router;