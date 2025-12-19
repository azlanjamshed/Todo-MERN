// import { useEffect } from "react";
// import { useForm } from "react-hook-form";

// const TodoForm = ({ onSubmit, defaultValues = {}, isSubmitting, todoId }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues,
//   });
//   useEffect(() => {
//     if (todoId) {
//       reset(defaultValues);
//     }
//   }, [todoId, reset]);

//   const submitHandler = (data) => {
//     onSubmit(data);

//     reset(); // clear form after submit
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(submitHandler)}
//       className="bg-white rounded-2xl shadow p-6 space-y-4"
//     >
//       <h3 className="text-xl font-semibold text-gray-800">Create Todo</h3>

//       {/* Title */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Title
//         </label>
//         <input
//           type="text"
//           placeholder="Todo title"
//           {...register("title", {
//             required: "Title is required",
//           })}
//           className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//         {errors.title && (
//           <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//         )}
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Description
//         </label>
//         <textarea
//           rows={3}
//           placeholder="Todo description"
//           {...register("description")}
//           className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Status */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Status
//         </label>
//         <select
//           {...register("status")}
//           className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
//       >
//         {isSubmitting ? "Saving..." : "Add Todo"}
//       </button>
//     </form>
//   );
// };

// export default TodoForm;

import { useEffect, useState } from "react";

const TodoForm = ({ onSubmit, defaultValues, isEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // ✅ ONLY set values, DO NOT submit
  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || "");
      setDescription(defaultValues.description || "");
      setStatus(defaultValues.status || "pending");
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      status,
    });

    if (!isEdit) {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-3">
        {isEdit ? "Edit Todo" : "Add Todo"}
      </h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {isEdit ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
