import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(`/api/user/getusers`, { withCredentials: true })
            .then((res) => setUsers(res.data))
            .catch((e) => console.log(e));
    }, [])

    const handleUserEdit = (e, userId) => {
        e.stopPropagation();
        setEditUser(users.find(user => user._id === userId));
        setShowModal(true);
    }

    const handleEditChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }

    const handleSave = async () => {
        try {
            await axios.put(`/api/user/update/${editUser._id}`,
                { name: editUser.name, email: editUser.email, profilePic: editUser.profilePic },
                { withCredentials: true }
            );
            setUsers(users.map(user => user._id === editUser._id ? editUser : user));
            setShowModal(false);
        } catch (e) {
            console.log(e);
        }
    }

    const handleUserDelete = async (e, userId) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`/api/user/delete/${userId}`, { withCredentials: true });
            setUsers(users.filter(user => user._id !== userId));
        } catch (e) {
            console.log(e);
        }
    }

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const admins = users.filter(u => u.role === "admin").length;
    const regular = users.filter(u => u.role === "user").length;

    return (
        <div className="min-h-screen bg-amber-50">

            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-3">
                    <h1
                        onClick={() => navigate("/")}
                        className="text-xl font-bold text-amber-500 cursor-pointer"
                    >
                        ✦ WordCraft
                    </h1>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span className="hidden sm:inline text-sm font-medium text-gray-500">Admin Panel</span>
                </div>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-xs md:text-sm text-gray-500 hover:text-amber-500 border border-gray-200 hover:border-amber-300 px-3 md:px-4 py-1.5 md:py-2 rounded-full cursor-pointer transition-all"
                >
                    <i className="ri-layout-grid-line"></i>
                    <span className="hidden sm:inline">User Dashboard</span>
                    <span className="sm:hidden">Dashboard</span>
                </button>
            </div>

            <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Total</p>
                        <p className="text-2xl md:text-4xl font-bold text-gray-800">{users.length}</p>
                        <p className="text-xs text-gray-400 mt-1">users</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Admins</p>
                        <p className="text-2xl md:text-4xl font-bold text-amber-500">{admins}</p>
                        <p className="text-xs text-gray-400 mt-1">accounts</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Regular</p>
                        <p className="text-2xl md:text-4xl font-bold text-green-500">{regular}</p>
                        <p className="text-xs text-gray-400 mt-1">accounts</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors shadow-sm"
                    />
                </div>

                {/* User Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => navigate(`/posts/${user._id}`)}
                            className="bg-white border border-gray-100 hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all relative group"
                        >
                            {/* Action Buttons */}
                            <div
                                className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={(e) => handleUserEdit(e, user._id)}
                                    className="w-7 h-7 bg-amber-50 hover:bg-amber-500 border border-amber-200 hover:border-amber-500 rounded-lg flex items-center justify-center text-amber-500 hover:text-white cursor-pointer transition-all text-xs"
                                >
                                    <i className="ri-edit-2-line"></i>
                                </button>
                                <button
                                    onClick={(e) => handleUserDelete(e, user._id)}
                                    className="w-7 h-7 bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-lg flex items-center justify-center text-red-400 hover:text-white cursor-pointer transition-all text-xs"
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            {/* Profile */}
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={user.profilePic}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-100"
                                />
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === 'admin'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-green-50 text-green-600 border border-green-100'
                                    }`}>
                                    {user.role}
                                </span>
                            </div>

                            <h2 className="font-semibold text-gray-800 text-sm truncate mb-1">{user.name}</h2>
                            <p className="text-gray-400 text-xs truncate mb-4">{user.email}</p>

                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs text-gray-400">
                                    Joined {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-4xl mb-3">🔍</p>
                        <p className="font-medium">No users found</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {showModal && editUser && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white border border-gray-100 rounded-t-3xl sm:rounded-2xl p-6 w-full sm:max-w-md shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Handle bar for mobile */}
                        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

                        <h2 className="text-lg font-bold text-gray-800 mb-5">Edit User</h2>

                        <div className="flex justify-center mb-5">
                            <img
                                src={editUser.profilePic}
                                alt="profile"
                                className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editUser.name}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editUser.email}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">Profile Pic URL</label>
                                <input
                                    type="text"
                                    name="profilePic"
                                    value={editUser.profilePic}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl text-sm cursor-pointer transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-500 py-3 rounded-xl text-sm cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard