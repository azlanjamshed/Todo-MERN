import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
