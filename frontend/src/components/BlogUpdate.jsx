import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../api/index";

const BlogUpdate = () => {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
  });
  const blogId = localStorage.getItem("selectedBlogId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}fetchOne/${blogId}`);
        setBlogDetails(response.data.findBlog);
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      }
    };

    if (blogId) fetchBlogDetails();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}update/${blogId}`, blogDetails);
      toast.success("Blog updated successfully!");
      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error("Failed to update blog. Please try again.");
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-lg max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Update Blog
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={blogDetails.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={blogDetails.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogUpdate;
