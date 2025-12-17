import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Login to access your notes
        </p>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}