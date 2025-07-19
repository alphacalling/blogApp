import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginStatusChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStatusChanged", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-teal-500 py-4 shadow-md">
      <ul className="flex justify-around items-center text-lg font-medium">
        <li>
          <Link
            to="/"
            aria-label="Home"
            className="text-white hover:text-gray-200"
          >
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-white text-cyan-700 hover:bg-cyan-600 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" aria-label="Log In">
              <button className="bg-white text-cyan-700 hover:bg-cyan-600 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300">
                Log In
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
