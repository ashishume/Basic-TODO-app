const express = require("express");
const router = express.Router();
const Tasks = require("../models/Tasks");
const authenticateToken = require("../controllers/authMiddleware");

router.post("/todo", async (req, res) => {
  try {
    const { title, description, taskStatus } = req.body;
    const newTask = new Tasks({
      title,
      description,
      taskStatus,
    });
    await newTask.save();
    res.status(201).json({ tasks, message: "created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { taskStatus } = req.body;
    await Tasks.findByIdAndUpdate(id, {
      taskStatus,
    });
    res.status(200).json({
      message: "task status updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/todo", async (req, res) => {
  try {
    const tasks = await Tasks.find().select("-__v");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
