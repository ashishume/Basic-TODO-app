const express = require("express");
const router = express.Router();
const Tasks = require("../models/Tasks");
const authenticateToken = require("../controllers/authMiddleware");

router.get("/search", authenticateToken, async (req, res) => {
  try {
    const { searchValue } = req.query;
    const tasks = await Tasks.find({
      $or: [
        { title: { $regex: searchValue, $options: "i" } }, // Case-insensitive search
        { description: { $regex: searchValue, $options: "i" } }, // Case-insensitive search
      ],
    }).select("-__v");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
