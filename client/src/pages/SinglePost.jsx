import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SinglePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [lightbox, setLightbox] = useState(false);

    useEffect(() => {
        axios.get(`/api/post/${id}`, { withCredentials: true })
            .then((res) => setPost(res.data))
            .catch((err) => console.log(err))
    }, [id]);

    if (!post) return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-12">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 cursor-pointer transition-colors mb-8"
                >
                    <i className="ri-arrow-left-line"></i>
                    Back to posts
                </button>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    {/* Cover Image */}
                    {/* Cover Image — clickable */}
                    {post.image && (
                        <>
                            <img
                                src={post.image}
                                alt={post.title}
                                onClick={() => setLightbox(true)}
                                className="w-full h-72 object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
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
                                        src={post.image}
                                        alt={post.title}
                                        onClick={(e) => e.stopPropagation()} // stop click from closing when clicking image
                                        className="max-w-full max-h-[90vh] object-contain rounded-xl"
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {/* No image — amber bar */}
                    {!post.image && (
                        <div className="w-full h-2 bg-amber-400" />
                    )}

                    <div className="p-8">

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Author Row */}
                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                            {post.author?.profilePic ? (
                                <img
                                    src={post.author.profilePic}
                                    alt={post.author.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-200"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-semibold">
                                    {post.author?.name?.[0]?.toUpperCase() || "?"}
                                </div>
                            )}

                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    {post.author?.name || "Unknown"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Read time estimate */}
                            <div className="ml-auto">
                                <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100">
                                    {Math.ceil(post.description?.split(" ").length / 200)} min read
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <p className="text-gray-600 leading-relaxed text-base mt-6 whitespace-pre-line">
                            {post.description}
                        </p>

                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 cursor-pointer transition-colors"
                    >
                        <i className="ri-layout-grid-line"></i>
                        Back to all posts
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SinglePost