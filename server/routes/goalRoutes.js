const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  updateProgress,
} = require("../controllers/goalController");

router.post("/", authMiddleware, createGoal);

router.get("/", authMiddleware, getGoals);

router.patch("/:id/progress",authMiddleware,updateProgress);

router.put("/:id", authMiddleware, updateGoal);

router.delete("/:id", authMiddleware, deleteGoal);



module.exports = router;