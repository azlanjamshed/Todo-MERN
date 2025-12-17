import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      });

      // 🔐 if backend returns token after register
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/notes");
      } else {
        // if backend does NOT return token, login manually
        const loginRes = await axios.post(`${BASE_URL}/login`, {
          email,
          password,
        });
        localStorage.setItem("token", loginRes.data.token);
        navigate("/notes");
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Sign up to start saving your notes
        </p>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

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
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
