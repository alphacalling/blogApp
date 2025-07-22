import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api/index";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${apiUrl}login`, loginUser);

    if (response.status === 200) {
      toast.success("Login successful");
      localStorage.setItem("isLoggedIn", "true");

      // Notify other components like Navbar
      window.dispatchEvent(new Event("loginStatusChanged"));

      setLoginUser({ email: "", password: "" });
      navigate("/");
    } else {
      toast.error("Invalid login credentials");
    }
  } catch (err) {
    console.error("Login failed", err);
    toast.error("Login failed. Please try again.");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        <label htmlFor="email" className="text-lg font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter your email"
          value={loginUser?.email}
          onChange={handleChange}
          className="w-full text-lg bg-slate-100 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="password" className="text-lg font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your password"
          value={loginUser?.password}
          onChange={handleChange}
          className="w-full text-lg bg-slate-100 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Not a user?
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline ml-2"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
