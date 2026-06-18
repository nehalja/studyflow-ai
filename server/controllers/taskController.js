const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, subject, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      subject,
      priority,
      dueDate,
      userId: req.user.userId,
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
};