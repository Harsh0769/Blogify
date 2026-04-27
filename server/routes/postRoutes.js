const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { authRoles } = require("../middleware/authRoles");
const {getallposts, createPost, getPostById, deletePost, editPost } = require("../controllers/postController");



router
    .get("/getallposts", authMiddleware, authRoles("admin", "user"), getallposts)           //get all posts
    .get("/:id", authMiddleware, authRoles("admin", "user"),getPostById )          //get post by id
    .post("/createpost", authMiddleware, authRoles("admin", "user"), createPost)            //create post
    .put("/:id", authMiddleware, authRoles("admin", "user"), editPost)              //edit post
    .delete("/:id", authMiddleware, authRoles("admin", "user"),deletePost)            //delete post

module.exports = router;