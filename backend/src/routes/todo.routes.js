const express = require("express")
const { create, editTodo, deleteTodo, allTodo, updateTodoStatus, filterTodo } = require("../controllers/todo.controller")
const ensureAuthentication = require("../middleware/auth.middleware")
const router = express.Router()



router.post("/create", ensureAuthentication, create)
router.put("/:id", ensureAuthentication, editTodo)
router.delete("/:id", ensureAuthentication, deleteTodo)
router.get("/all", ensureAuthentication, allTodo)
router.patch("/:id/status", ensureAuthentication, updateTodoStatus);
router.get("/filter", ensureAuthentication, filterTodo);


module.exports = router