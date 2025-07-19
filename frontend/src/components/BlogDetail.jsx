import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../api/index";

const BlogDetail = () => {
  const [blogDetails, setBlogDetails] = useState(null);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}delete/${blogId}`);
      toast.success("Blog deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${blogId}`);
  };

  if (!blogDetails) {
    return <p className="text-center mt-8 text-lg">Loading...</p>;
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-lg max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Blog Details
      </h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          Title: {blogDetails.title}
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          Description: {blogDetails.description}
        </p>
        <div className="text-sm text-gray-500">
          <p>Updated at: {new Date(blogDetails.updatedAt).toLocaleString()}</p>
          <p>Created at: {new Date(blogDetails.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
