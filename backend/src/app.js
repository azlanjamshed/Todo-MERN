require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("../src/db/db")
const cors = require("cors")
const authRoute = require("./routes/auth.routes")
const todoRoute = require("./routes/todo.routes")



app.use(cors())
app.use(express.json())

connectDB()



app.get("/", (req, res) => {
    res.send("Home")
})

app.use("/api/auth", authRoute)
app.use("/api/todo", todoRoute)


module.exports = app






