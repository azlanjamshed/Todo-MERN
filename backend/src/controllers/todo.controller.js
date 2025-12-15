const todoModel = require("../models/todo.model")


const create = async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }
        const todo = await todoModel.create({
            userId: req.user.id,
            title,
            description
        })
        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        });

    }
    catch (error) {
        console.log(error);


        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}
const editTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const { title, description } = req.body
        const todo = await todoModel.findOne({
            _id: todoId,
            userId: req.user.id
        })

        if (!todo) {
            res.status(404).json({
                message: "todo not found or not authorized"
            })
        }

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;

        await todo.save();

        res.json({
            message: "Note updated successfully",
            todo
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
}
const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const todo = await todoModel.findByIdAndDelete({
            _id: todoId,
            userId: req.user.id
        })
        if (!todo) {
            return res.status(404).json({
                message: "Note not found or not authorized"
            });
        }
        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message

        })
    }
}

const updateTodoStatus = async (req, res) => {
    try {
        const todoId = req.params.id
        const { status } = req.body
        const allowedStatus = ['pending', "in-progress", "completed"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value"
            })
        }

        const todo = await todoModel.findOneAndUpdate({
            _id: todoId,
            userId: req.user.id
        }
            ,
            { status },
            { new: true })

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or not authorized",
            });
        }
        res.json({
            message: "Status updated successfully",
            todo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });

    }
}

const filterTodo = async (req, res) => {
    try {
        const { status } = req.query;

        const query = { userId: req.user.id };

        if (status) {
            const allowedStatus = ["pending", "in-progress", "completed"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status filter",
                });
            }
            query.status = status;
        }

        const todos = await todoModel.find(query);

        res.json({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

const allTodo = async (req, res) => {
    try {
        const todo = await todoModel.find({ userId: req.user.id })
        res.json({ todo })
    } catch (error) {
        res.status(500).json({
            message: "Server Error", error
        })
    }
}

module.exports = { create, editTodo, deleteTodo, allTodo, updateTodoStatus, filterTodo }

