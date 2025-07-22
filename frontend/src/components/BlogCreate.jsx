import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../api/index";

const BlogCreate = () => {
  const [blogData, setBlogData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      axios
        .post(`${apiUrl}create`, blogData)
        .then(() => {
          toast.success("Blog created successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error creating blog", error);
          toast.success("Failed to create blog");
        });
    } else {
      toast.error("Please log in to create a blog.");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Create New Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData?.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={blogData?.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogCreate;
