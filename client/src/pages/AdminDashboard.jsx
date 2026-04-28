import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/user/getusers`,
            { withCredentials: true })
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
            alert("User updated successfully");
        } catch (e) {
            console.log(e);
            alert("Error updating user");
        }
    }

    const handleUserDelete = async (e, userId) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`/api/user/delete/${userId}`, { withCredentials: true });
            setUsers(users.filter(user => user._id !== userId));
            alert("User deleted successfully");
        } catch (e) {
            console.log(e);
            alert("Error deleting user");
        }
    }

    return (
        <div className="min-h-screen bg-amber-50 p-8">

            {/* Header */}
            <div className="mb-8 relative">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Managing {users.length} users</p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 border border-gray-200 hover:border-amber-300 px-4 py-2 rounded-full cursor-pointer transition-colors absolute right-0 top-0"
                >
                    <i className="ri-layout-grid-line"></i>
                    User Dashboard
                </button>
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer relative"
                        onClick={() => navigate(`/posts/${user._id}`)}
                    >
                        <div
                            onClick={(e) => handleUserDelete(e, user._id)}
                            className='absolute block right-8 top-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors text-xl'>
                            <i class="ri-delete-bin-fill"></i>
                        </div>

                        <div onClick={(e) => handleUserEdit(e, user._id)} className='absolute block right-17 top-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors text-xl'>
                            <i class="ri-edit-2-fill"></i>
                        </div>
                        {/* Profile Pic + Role Badge */}
                        <div className="flex items-center justify-between mb-4 mt-6">
                            <img
                                src={user.profilePic}
                                alt={user.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-amber-200"
                            />
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full 
                                ${user.role === 'admin'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                {user.role}
                                {/* {user._id} */}
                            </span>
                        </div>

                        {/* Name & Email */}
                        <h2 className="font-semibold text-gray-800 text-base truncate">{user.name}</h2>
                        <p className="text-gray-400 text-sm truncate mt-0.5">{user.email}</p>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4" />

                        {/* Joined Date */}
                        <p className="text-xs text-gray-400">
                            Joined: {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </p>
                    </div>
                ))}
            </div>

            {showModal && editUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">

                        <h2 className="text-xl font-bold text-gray-800 mb-6">Edit User</h2>

                        {/* Profile Pic Preview */}
                        <div className="flex justify-center mb-4">
                            <img
                                src={editUser.profilePic}
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-amber-200"
                            />
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-500 mb-1 block">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editUser.name}
                                onChange={handleEditChange}
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-400"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-500 mb-1 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editUser.email}
                                onChange={handleEditChange}
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-400"
                            />
                        </div>

                        {/* Profile Pic URL */}
                        <div className="mb-6">
                            <label className="text-sm text-gray-500 mb-1 block">Profile Pic URL</label>
                            <input
                                type="text"
                                name="profilePic"
                                value={editUser.profilePic}
                                onChange={handleEditChange}
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-400"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-amber-400 text-white py-3 rounded-xl font-medium hover:bg-amber-500 cursor-pointer"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 border border-gray-200 py-3 rounded-xl text-gray-500 hover:bg-gray-50 cursor-pointer"
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