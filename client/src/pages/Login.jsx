import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" });
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { setVerifiedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`/api/auth/login`, user, { withCredentials: true });

            // const userRes = await axios.get(`/api/auth/me`, { withCredentials: true });

            setVerifiedUser(res.data.user);

            if (userRes.data.role === "admin") {
                setShowPopup(true);
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">

            {/* Admin Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-80">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 text-xl">
                            <i className="ri-shield-user-line"></i>
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Welcome back, Admin!</h2>
                        <p className="text-gray-400 text-sm text-center">Where would you like to go?</p>
                        <div className="flex flex-col gap-2 w-full mt-1">
                            <button
                                onClick={() => navigate("/admin/dashboard")}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                            >
                                Admin Dashboard
                            </button>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                            >
                                User Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Card */}
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-amber-500">✦ MyBlog</h1>
                    <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
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
                                placeholder="Enter your password"
                                required
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 hover:border-gray-300 transition-colors"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium py-3 rounded-xl text-sm cursor-pointer transition-colors mt-1"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-amber-500 hover:text-amber-600 font-medium cursor-pointer transition-colors"
                        >
                            Sign up
                        </button>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login