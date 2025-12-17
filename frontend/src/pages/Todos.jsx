import React from "react";

import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";

const BASE_URL = "http://localhost:8080/api/todo";
const Task = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTodos = async () => {
    const res = await axios.get(`${BASE_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(res.data.todo);
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <div className="bg-red-700 p-2">
        {todos.map((todo) => (
          <>
            <div
              key={todo._id}
              className="bg-white rounded-2xl shadow px-2 flex flex-col justify-center m-4 "
            >
              {" "}
              <h4 className="text-lg font-semibold mb-1">{todo.title}</h4>
              <p className="text-gray-600 mb-4">{todo.description}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => startEdit(note)}
                  className="text-indigo-600 text-sm hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Task;
