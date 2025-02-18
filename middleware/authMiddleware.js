const jwt = require("jsonwebtoken");
const e = require("express");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);  // Сохраняем информацию о пользователе в запросе
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticate;