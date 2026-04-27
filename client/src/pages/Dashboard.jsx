import Navbar from '../components/Navbar'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { verifiedUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get("http://localhost:5001/api/post/getallposts", { withCredentials: true })
            .then((res) => setPosts(res.data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />

            {/* Full width header banner */}
            <div className="w-full bg-white border-b border-gray-100 px-10 py-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">All Posts</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {posts.length} {posts.length === 1 ? "post" : "posts"} published
                    </p>
                </div>


                <div className="flex items-center gap-3">

                    {/* ← Show only if user is admin */}
                    {verifiedUser?.role === "admin" && (
                        <button
                            onClick={() => navigate("/admin/dashboard")}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 border border-gray-200 hover:border-amber-300 px-4 py-2 rounded-full cursor-pointer transition-colors"
                        >
                            <i className="ri-shield-user-line"></i>
                            Admin Dashboard
                        </button>
                    )}

                    <button
                        onClick={() => navigate("/createpost")}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-6 py-3 rounded-full cursor-pointer transition-colors"
                    >
                        <i className="ri-add-line text-base"></i>
                        New post
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-32">
                    <div className="w-8 h-8 border-4 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
                </div>
            )}

            {/* Empty State */}
            {!loading && posts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                    <p className="text-6xl mb-4">📭</p>
                    <p className="text-xl font-medium text-gray-600">No posts yet</p>
                    <p className="text-sm mb-6">Be the first one to write something!</p>
                    <button
                        onClick={() => navigate("/createpost")}
                        className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-6 py-2.5 rounded-full cursor-pointer transition-colors"
                    >
                        Write a post
                    </button>
                </div>
            )}

            {/* Full width posts grid */}
            <div className="w-full px-10 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            onClick={() => navigate(`/post/${post._id}`)}
                            className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col"
                        >
                            {/* Post Image */}
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-44 object-cover"
                                />
                            ) : (
                                <div className="w-full h-2 bg-amber-400" />
                            )}

                            <div className="p-5 flex flex-col flex-1">

                                {/* Title */}
                                <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                                    {post.description}
                                </p>

                                {/* Footer */}
                                <div className="border-t border-gray-100 mt-4 pt-4 flex items-center gap-3">

                                    {/* Author Pic */}
                                    {post.author?.profilePic ? (
                                        <img
                                            src={post.author.profilePic}
                                            alt={post.author.name}
                                            className="w-7 h-7 rounded-full object-cover border border-amber-200 shrink-0"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-semibold shrink-0">
                                            {post.author?.name?.[0]?.toUpperCase() || "?"}
                                        </div>
                                    )}

                                    {/* Author + Date */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-700 truncate">
                                            {post.author?.name || "Unknown"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <i className="ri-arrow-right-line text-gray-300 text-sm shrink-0"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard