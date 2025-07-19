import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api/index";

const SignUp = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}register`, userData);
      toast.success("Sign up successful!");
      setUserData({ userName: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        <label
          htmlFor="userName"
          className="text-lg font-semibold text-gray-700"
        >
          User Name
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          required
          value={userData.userName}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full text-lg bg-slate-100 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="email" className="text-lg font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full text-lg bg-slate-100 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label
          htmlFor="password"
          className="text-lg font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full text-lg bg-slate-100 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Sign Up
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline ml-2"
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
