const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields required"
            })

        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "user alredy exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User registered successful",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error", error
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid credential"
            })

        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,

            { expiresIn: "1d" })

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email

            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error", error
        })
    }
}


module.exports = { register, login }