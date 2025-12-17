import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Organize your work.
            <span className="text-indigo-600"> Stay productive.</span>
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            A simple and secure Todo app to manage your daily tasks. Create,
            update, filter, and track progress — all in one place.
          </p>

          <div className="flex gap-4">
            {!token ? (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-white transition"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                to="/todos"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Why use this Todo App?
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>✅ Secure login with JWT</li>
            <li>📝 Create & manage todos</li>
            <li>🔄 Update task status easily</li>
            <li>🎯 Filter by pending / in-progress / completed</li>
            <li>🔒 Your tasks are private</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
