import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const Navbar = () => {
    const { verifiedUser, setVerifiedUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
        setVerifiedUser(null);
        navigate("/");
    }

    return (
        <nav className='h-16 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-50 shadow-sm'>

            {/* Logo */}
            <h1
                onClick={() => navigate("/")}
                className='text-xl font-bold text-amber-500 cursor-pointer tracking-tight'
            >
                ✦ MyBlog
            </h1>

            {/* Nav Links */}
            <ul className='hidden md:flex space-x-8 ml-12'>
                <li
                    onClick={() => {
                        navigate("/");
                        setTimeout(() => {
                            document.getElementById("Home")?.scrollIntoView({ behavior: "smooth" });
                        }, 100)

                    }}
                    className='text-gray-500 hover:text-amber-500 cursor-pointer text-sm font-medium transition-colors'
                >
                    Home
                </li>

                <li onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    }, 100)

                }}
                    className='text-gray-500 hover:text-amber-500 cursor-pointer text-sm font-medium transition-colors'>
                    About
                </li>

                <li
                    onClick={() => window.open("mailto:harschaudhary578@gmail.com")}
                    className='text-gray-500 hover:text-amber-500 cursor-pointer text-sm font-medium transition-colors'>
                    Contact
                </li>
            </ul>

            {/* Right Side */}
            <div className='ml-auto flex items-center gap-3'>

                {!verifiedUser ? (
                    // Logged Out
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate("/login")}
                            className='text-sm text-gray-600 hover:text-amber-500 font-medium cursor-pointer transition-colors px-3 py-1.5'
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className='text-sm bg-amber-500 hover:bg-amber-600 text-white font-medium cursor-pointer transition-colors px-4 py-1.5 rounded-full'
                        >
                            Sign up
                        </button>
                    </div>
                ) : (
                    // Logged In
                    <div className="flex items-center gap-3">

                        {/* Write Post Button */}
                        <button
                            onClick={() => navigate("/createpost")}
                            className='hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 cursor-pointer transition-colors font-medium'
                        >
                            <i className="ri-edit-line text-base"></i>
                            Write
                        </button>

                        {/* Divider */}
                        <div className="w-px h-5 bg-gray-200" />

                        {/* Profile Pic */}
                        <button
                            onClick={() => navigate(`/profile/${verifiedUser._id}`)}
                            className="cursor-pointer"
                        >
                            <img
                                src={verifiedUser.profilePic}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border-2 border-amber-200 hover:border-amber-400 transition-colors"
                            />
                        </button>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className='text-gray-400 hover:text-red-400 cursor-pointer transition-colors text-lg'
                        >
                            <i className="ri-logout-circle-r-line"></i>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar