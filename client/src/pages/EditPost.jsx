import axios from "axios";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState({ title: "", description: "", image: "" });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5001/api/post/${id}`, { withCredentials: true })
            .then((res) => setPost({
                title: res.data.title,
                description: res.data.description,
                image: res.data.image || "",
            }))
            .catch((err) => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        setError("");
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            return setError("Image size must be less than 10MB.");
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "blog_first");
            formData.append("cloud_name", "dyustzjyh");

            const res = await axios.post("https://api.cloudinary.com/v1_1/dyustzjyh/image/upload", formData);
            setPost({ ...post, image: res.data.secure_url });
        } catch (err) {
            setError("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!post.title || !post.description) {
            return setError("Title and description are required.");
        }

        setLoading(true);

        try {
            await axios.put(
                `http://localhost:5001/api/post/${id}`,
                post,
                { withCredentials: true }
            );
            navigate(`/post/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update post.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 cursor-pointer transition-colors mb-4"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Edit post</h1>
                    <p className="text-gray-400 text-sm mt-1">Update your post details below</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Cover Image */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">
                                Cover image
                            </label>

                            {post.image ? (
                                <div className="relative">
                                    <img
                                        src={post.image}
                                        alt="cover"
                                        className="w-full h-52 object-cover rounded-xl"
                                    />
                                    {/* Change image overlay button */}
                                    <label
                                        htmlFor="coverImage"
                                        className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm"
                                    >
                                        <i className="ri-image-edit-line"></i>
                                        {uploading ? "Uploading..." : "Change image"}
                                    </label>

                                    {/* Remove image button */}
                                    <button
                                        type="button"
                                        onClick={() => setPost({ ...post, image: "" })}
                                        className="absolute top-3 right-3 bg-white text-gray-400 hover:text-red-400 text-xs px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer transition-colors"
                                    >
                                        Remove
                                    </button>

                                    <input
                                        type="file"
                                        id="coverImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <label
                                    htmlFor="coverImage"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl hover:border-amber-400 transition-colors cursor-pointer bg-amber-50/50"
                                >
                                    <i className="ri-image-add-line text-3xl text-gray-300 mb-2"></i>
                                    <p className="text-sm text-gray-400">
                                        {uploading ? "Uploading..." : "Click to upload a cover image"}
                                    </p>
                                    <p className="text-xs text-gray-300 mt-1">Max 10MB</p>
                                    <input
                                        type="file"
                                        id="coverImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={post.title}
                                onChange={handleChange}
                                placeholder="Post title..."
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 hover:border-gray-300 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={post.description}
                                onChange={handleChange}
                                placeholder="Write your post content here..."
                                rows={8}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 hover:border-gray-300 transition-colors resize-none leading-relaxed"
                            />
                            <p className="text-xs text-gray-300 mt-1 text-right">
                                {post.description.length} characters
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-500 text-sm font-medium py-3 rounded-xl cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm font-medium py-3 rounded-xl cursor-pointer transition-colors"
                            >
                                {loading ? "Saving..." : "Save changes"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost