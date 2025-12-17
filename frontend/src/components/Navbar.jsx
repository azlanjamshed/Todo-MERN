import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          NotesApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/notes" className="text-gray-700 hover:text-indigo-600">
                My Notes
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
