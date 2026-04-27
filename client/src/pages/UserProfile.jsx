import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [lightbox, setLightbox] = useState(false);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}`, { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));

        axios.get(`${import.meta.env.VITE_API_URL}/api/user/posts/${id}`, { withCredentials: true })
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, [id])

    const handleDelete = async (e, postId) => {
        e.stopPropagation();
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, { withCredentials: true });
            setPosts(posts.filter((post) => post._id !== postId));
            setConfirmId(null);
        } catch (err) {
            console.log(err);
        }
    }

    if (!user) return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />



            {/* Profile Header */}
            <div className="w-full bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center relative">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 cursor-pointer transition-colors mb-8 absolute left-6 top-6"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Back
                    </button>

                    {user.profilePic && (
                        <>
                            <img
                                src={user.profilePic}
                                alt={user.name}
                                onClick={() => setLightbox(true)}
                                className="w-24 h-24 rounded-full object-cover border-4 border-amber-200 mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                            />


                            {/* Lightbox */}
                            {lightbox && (
                                <div
                                    onClick={() => setLightbox(false)}
                                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out px-4"
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setLightbox(false)}
                                        className="absolute top-5 right-5 text-white text-3xl hover:text-gray-300 cursor-pointer transition-colors"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>

                                    {/* Full Image */}
                                    <img
                                        src={user.profilePic}
                                        alt={user.name}
                                        onClick={(e) => e.stopPropagation()} // stop click from closing when clicking image
                                        className="max-w-full max-h-[90vh] object-contain rounded-xl"
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {/* No image — amber bar */}
                    {!user.profilePic && (
                        <div className="w-full h-2 bg-amber-400" />
                    )}

                    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-400 text-sm mt-1">{user.email}</p>

                    <div className="flex items-center gap-2 mt-4">
                        <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-amber-200">
                            {posts.length} {posts.length === 1 ? "post" : "posts"}
                        </span>
                        <span className="bg-gray-50 text-gray-500 text-xs font-semibold px-4 py-1.5 rounded-full border border-gray-200 capitalize">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="max-w-6xl mx-auto px-6 py-10">

                <h2 className="text-xl font-bold text-gray-800 mb-6">Posts</h2>

                {/* Empty State */}
                {posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <p className="text-5xl mb-4">📭</p>
                        <p className="text-lg font-medium text-gray-600">No posts yet</p>
                        <p className="text-sm mb-6">Start writing something!</p>
                        <button
                            onClick={() => navigate("/createpost")}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-6 py-2.5 rounded-full cursor-pointer transition-colors"
                        >
                            Write a post
                        </button>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            onClick={() => navigate(`/post/${post._id}`)}
                            className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col relative"
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
                                <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 pr-14">
                                    {post.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                                    {post.description}
                                </p>

                                {/* Date */}
                                <p className="text-xs text-gray-300 mt-4">
                                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-1.5" onClick={(e) => e.stopPropagation()}>

                                {/* Edit */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/editpost/${post._id}`);
                                    }}
                                    className="w-8 h-8 bg-white hover:bg-amber-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 cursor-pointer transition-colors shadow-sm"
                                >
                                    <i className="ri-edit-2-line text-sm"></i>
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmId(post._id);
                                    }}
                                    className="w-8 h-8 bg-white hover:bg-red-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 cursor-pointer transition-colors shadow-sm"
                                >
                                    <i className="ri-delete-bin-line text-sm"></i>
                                </button>

                                {/* Confirm Popover */}
                                {confirmId === post._id && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute right-0 top-10 bg-white border border-gray-100 rounded-xl shadow-lg p-3 z-10 w-44"
                                    >
                                        <p className="text-xs font-medium text-gray-700 mb-2">Delete this post?</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => handleDelete(e, post._id)}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 rounded-lg cursor-pointer transition-colors"
                                            >
                                                Yes
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setConfirmId(null);
                                                }}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs py-1.5 rounded-lg cursor-pointer transition-colors"
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile