import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", password: "", role: "admin", profilePic: "",
    });

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError("");
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            return setError("Image size must be less than 10MB.");
        }

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const image = new FormData();
            image.append("file", file);
            image.append("upload_preset", "blog_first");
            image.append("cloud_name", "dyustzjyh");

            const res = await axios.post("https://api.cloudinary.com/v1_1/dyustzjyh/image/upload", image);
            setUser({ ...user, profilePic: res.data.secure_url });
        } catch (err) {
            setError("Image upload failed. Please try again.");
            setPreview(null);
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            return setError("Please fill in all fields.");
        }

        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, user);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-amber-500">✦ MyBlog</h1>
                    <p className="text-gray-400 text-sm mt-1">Create an admin account</p>

                    {/* Admin Badge */}
                    <span className="inline-flex items-center gap-1.5 mt-3 bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-amber-200">
                        <i className="ri-shield-user-line"></i>
                        Admin Access
                    </span>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Profile Pic Upload */}
                        <div className="flex flex-col items-center gap-2 mb-1">
                            <div className="relative">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-amber-300"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-dashed border-amber-300 flex items-center justify-center text-amber-400 text-2xl">
                                        <i className="ri-shield-user-line"></i>
                                    </div>
                                )}

                                <label
                                    htmlFor="profilePic"
                                    className="absolute bottom-0 right-0 w-7 h-7 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                                >
                                    <i className="ri-camera-line text-white text-xs"></i>
                                </label>

                                <input
                                    type="file"
                                    id="profilePic"
                                    name="profilePic"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <span className="text-xs text-gray-400">
                                {uploading ? "Uploading..." : "Upload profile picture"}
                            </span>
                        </div>

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Full name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Admin name"
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 hover:border-gray-300 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 hover:border-gray-300 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 hover:border-gray-300 transition-colors"
                            />
                        </div>

                        {/* Role — locked to admin */}
                        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                            <i className="ri-shield-check-line text-amber-500"></i>
                            <div>
                                <p className="text-sm font-medium text-gray-700">Role: Admin</p>
                                <p className="text-xs text-gray-400">This account will have admin privileges</p>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium py-3 rounded-xl text-sm cursor-pointer transition-colors mt-1"
                        >
                            {loading ? "Creating account..." : "Create admin account"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-amber-500 hover:text-amber-600 font-medium cursor-pointer transition-colors"
                        >
                            Sign in
                        </button>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default AdminSignup