const Goal = require("../models/Goal");

const createGoal = async (req, res) => {
  try {
    const { title, target, deadline, subjectId } = req.body;

    const goal = new Goal({
      title,
      target,
      deadline,
      subjectId,
      userId: req.user.id,
    });

    await goal.save();

    res.status(201).json({
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    }).populate("subjectId", "name");

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    Object.assign(goal, req.body);

    if (goal.progress >= goal.target) {
      goal.isCompleted = true;
    }

    await goal.save();

    res.status(200).json({
      message: "Goal updated successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.status(200).json({
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};