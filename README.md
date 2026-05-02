# ✦ WordCraft

A full-stack blog platform where users can read, write, and manage posts — with a separate admin panel for platform management.

---

## 🌐 Live Demo

- **Frontend:** [blogify-nine-eta.vercel.app](https://blogify-nine-eta.vercel.app)
- **Backend:** [blogify-cgak.onrender.com](https://blogify-cgak.onrender.com)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Image Storage | Cloudinary |
| API Testing | Postman |
| Deployment | Vercel (frontend), Render (backend) |

---

## ✨ Features

### 👤 User Side

- **Signup & Login** — secure authentication with JWT stored in httpOnly cookies
- **Profile Picture Upload** — upload profile images directly to Cloudinary
- **View All Posts** — browse all published blog posts in a responsive card grid
- **Search Posts** — search by title, description or author name in real time
- **Read Single Post** — full post view with cover image, author info and read time estimate
- **Create Post** — write and publish posts with a title, description and cover image
- **Edit Post** — update your own post's title, description or cover image
- **Delete Post** — delete your own posts with an inline confirmation popover
- **User Profile** — view your profile with all your published posts
- **Lightbox Image Viewer** — click post cover image to view it fullscreen

### 🛡️ Admin Side

- **Admin Dashboard** — view all registered users in a card grid
- **User Stats** — see total users, admin count and regular user count at a glance
- **Search Users** — filter users by name or email in real time
- **Edit User** — update any user's name, email or profile picture via a slide-up modal
- **Delete User** — remove any user from the platform
- **View User Posts** — click any user card to see all their published posts
- **Role-based Access** — admin routes are protected and inaccessible to regular users
- **Admin/User Dashboard Toggle** — admins can switch between admin and user views

---

## 📁 Project Structure

```
Blogify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, Hero, Blog, Footer
│   │   ├── pages/          # Dashboard, Login, Signup, SinglePost, etc.
│   │   └── context/        # AuthProvider (global auth state)
│   └── vercel.json         # Vercel proxy config
│
└── server/                 # Node/Express backend
    ├── controllers/        # authController, userController, postController
    ├── middleware/         # authMiddleware, authRoles
    ├── models/             # User, Post (Mongoose schemas)
    └── routes/             # authRoutes, userRoutes, postRoutes
```

---

## 🔐 Authentication Flow

```
User logs in → JWT token created → stored in httpOnly cookie
Every request → authMiddleware reads cookie → verifies token
Protected routes → authRoles middleware checks user role
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/Harsh0769/Blogify.git
cd Blogify
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

Start the backend:

```bash
node index.js
```

### 3. Setup the frontend

```bash
cd client
npm install
npm run dev
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Clear auth cookie |
| GET | `/api/auth/me` | Get currently logged in user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/post/getallposts` | Get all posts (populated with author) |
| GET | `/api/post/:id` | Get single post by ID |
| POST | `/api/post/createpost` | Create a new post (auth required) |
| PUT | `/api/post/:id` | Edit a post (author only) |
| DELETE | `/api/post/:id` | Delete a post (author only) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/getusers` | Get all users (admin only) |
| GET | `/api/user/:id` | Get user by ID |
| GET | `/api/user/posts/:id` | Get all posts by a user |
| PUT | `/api/user/update/:id` | Update user details (admin only) |
| DELETE | `/api/user/delete/:id` | Delete a user (admin only) |

---

## 🖼️ Image Uploads

Profile pictures and post cover images are uploaded directly from the frontend to **Cloudinary** using an unsigned upload preset. The returned `secure_url` is stored in MongoDB.

---

## 👨‍💻 Author

**Harsh** — [GitHub](https://github.com/Harsh0769)

---

> Built from scratch as a full-stack learning project — from auth to deployment.
