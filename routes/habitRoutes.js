const express = require("express");
const Habit = require("../models/habit");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Создать привычку
router.post("/", authenticate, async (req, res) => {
    try {
        const { title, description } = req.body;
        const habit = new Habit({ userId: req.user.userId, title, description });
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Получить все привычки пользователя
router.get("/", authenticate, async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.userId });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Обновить привычку
router.put("/:id", authenticate, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const habit = await Habit.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { title, description, completed },
            { new: true }
        );
        if (!habit) return res.status(404).json({ message: "Habit not found" });
        res.json({habit, message: "Habit updated"});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Удалить привычку
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!habit) return res.status(404).json({ message: "Habit not found" });
        res.json({ message: "Habit deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id/progress", authenticate, async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ success: false, message: "Habit not found" });
        }

        habit.progress += 1;
        await habit.save();

        res.json({ success: true, progress: habit.progress });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;