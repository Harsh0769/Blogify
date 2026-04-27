require('dotenv').config();

const express = require('express'); 
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");


const User = require('./models/userModel');
const Post = require('./models/postModel');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const connectDB = require('./db');
const authMiddleware = require('./middleware/authmiddleware');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://blogify-nine-eta.vercel.app/",
    credentials: true
}));

connectDB();

const PORT = process.env.PORT;

app.get("/", async (req, res) => {
    res.send(await User.find());
})

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
    console.log(`Your app is running on PORT : http://localhost:${PORT}`);
});