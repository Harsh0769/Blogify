import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState([]);

    const id = window.location.pathname.split("/")[2];

    useEffect(() => {
        axios.get(`http://localhost:5001/api/user/posts/${id}`, { withCredentials: true })
            .then((res) => setUserDetails(res.data))
            .catch((e) => console.log(e))
    }, [id])

    return (
        <div className="min-h-screen bg-amber-50 p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">User's Posts</h1>
                <p className="text-gray-400 mt-1">{userDetails.length} post{userDetails.length !== 1 ? "s" : ""} found</p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userDetails.map((post) => (
                    <div
                        key={post._id}
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
                    >
                        {/* Card Top Color Bar */}
                        <div className="h-2 bg-amber-400 w-full" />

                        <div className="p-5">

                            {/* Title */}
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                {post.title}
                            </h2>

                            {/* Description — clamp to 3 lines */}
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                {post.description}
                            </p>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-4" />

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>
                                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                                    Post
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {userDetails.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                    <p className="text-5xl mb-4">📭</p>
                    <p className="text-lg font-medium">No posts yet</p>
                    <p className="text-sm">This user hasn't written anything.</p>
                </div>
            )}

        </div>
    )
}

export default UserDetails