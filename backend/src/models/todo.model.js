const mongoose = require("mongoose")


const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,

        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    dueDate: {
        type: Date,
    },



}, { timestamps: true })

const todoModel = mongoose.model("Todo", todoSchema)


module.exports = todoModel