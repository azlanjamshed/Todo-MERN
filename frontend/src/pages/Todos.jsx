import React, { useEffect, useState } from "react";
import { useRef } from "react";

import axios from "axios";
import TodoForm from "../components/TodoFrm";
import STATUS_STYLES from "../utils/status";

const BASE_URL = "http://localhost:8080/api/todo";

const Task = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const token = localStorage.getItem("token");
  const formRef = useRef(null);

  // ================= FETCH TODOS =================
  const fetchTodos = async () => {
    const res = await axios.get(`${BASE_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(res.data.todo);
  };

  // ================= CREATE TODO =================
  const createTodo = async (data) => {
    await axios.post(`${BASE_URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodos();
  };

  // ================= EDIT TODO =================
  const startEdit = (todo) => {
    setEditingTodo(todo);
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const updateTodo = async (id, data) => {
    await axios.put(`${BASE_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEditingTodo(null);
    fetchTodos();
  };

  // ================= DELETE TODO =================
  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodos();
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 ">
      {/* ================= FORM ================= */}
      <div ref={formRef}>
        {/* {editingTodo ? (
          <TodoForm
            todoId={editingTodo._id}
            defaultValues={{
              title: editingTodo.title,
              description: editingTodo.description,
              status: editingTodo.status,
            }}
            onSubmit={(data) => updateTodo(editingTodo._id, data)}
          />
        ) : (
          <TodoForm onSubmit={createTodo} />
        )} */}

        {editingTodo ? (
          <TodoForm
            isEdit={true} // ✅ THIS WAS MISSING
            defaultValues={{
              title: editingTodo.title,
              description: editingTodo.description,
              status: editingTodo.status,
            }}
            onSubmit={(data) => updateTodo(editingTodo._id, data)}
          />
        ) : (
          <TodoForm onSubmit={createTodo} />
        )}
      </div>

      {/* ================= TODO LIST ================= */}
      <div className="mt-6">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet</p>
        ) : (
          todos.map((todo) => {
            const statusStyle =
              STATUS_STYLES[todo.status] || STATUS_STYLES.pending;

            return (
              <div
                key={todo._id}
                className={`bg-white rounded-2xl shadow px-4 py-3 my-4 border-l-4 ${statusStyle.border}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{todo.title}</h4>
                    <p className="text-gray-600">{todo.description}</p>
                  </div>

                  <span
                    className={`text-sm px-3 py-1 rounded-full ${statusStyle.badge}`}
                  >
                    {todo.status}
                  </span>
                </div>

                <div className="flex justify-end gap-4 mt-3">
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Task;
