const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Habit", habitSchema);