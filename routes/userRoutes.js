const express = require("express");
const User = require("../models/user");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Маршрут для получения профиля
router.get("/profile", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Исключаем пароль
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;