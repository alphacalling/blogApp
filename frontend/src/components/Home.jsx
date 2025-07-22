import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../api/index";

const Home = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}fetchAll`);
        setBlog(response?.data?.blogs);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleReadMore = (id) => {
    if (isLoggedIn) {
      localStorage.setItem("selectedBlogId", id);
      navigate(`/blogs/${id}`);
    } else {
      toast.error("Please log in to read more.");
      navigate("/login");
    }
  };

  const handleCreateBlog = () => {
    if (isLoggedIn) {
      navigate("/create-blog");
    } else {
      toast.error("Please log in to create a blog.");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Latest Blogs</h1>
      {isLoggedIn && (
        <button
          onClick={handleCreateBlog}
          className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create New Blog
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blog?.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
            <p className="text-gray-700 mb-2">
              {post?.description.substring(0, 100)}...
            </p>
            {isLoggedIn ? (
              <button
                onClick={() => handleReadMore(post._id)}
                className="text-blue-500 hover:underline"
              >
                Read More
              </button>
            ) : (
              <p className="text-red-500 italic">Log in to read more</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
