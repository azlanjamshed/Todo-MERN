

const jwt = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]; // or req.header("Authorization")

        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Unauthorized. Token missing" });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({ success: false, message: "Unauthorized. Invalid token format" });
        }

        const token = parts[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized. Token invalid or expired" });
    }
};

module.exports = ensureAuthentication;