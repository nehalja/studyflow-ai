const express = require("express");
const authMiddleware =
  require("../middleware/authMiddleware");
const StudySession = require("../models/StudySession");
const router = express.Router();

router.use(authMiddleware);

router.get("/streak", async (req, res) => {
  try {
    const sessions =
      await StudySession.find({
        userId: req.user.id,
      }).sort({ date: 1 });
      const studyDays = [
  ...new Set(
    sessions.map((session) =>
      new Date(session.startTime)
        .toISOString()
        .split("T")[0]
    )
  ),
];
let longestStreak = 0;
let currentLongest = 1;

for (let i = 1; i < studyDays.length; i++) {
  const prev = new Date(studyDays[i - 1]);
  const curr = new Date(studyDays[i]);

  const diff =
    (curr - prev) /
    (1000 * 60 * 60 * 24);

  if (diff === 1) {
    currentLongest++;
  } else {
    longestStreak = Math.max(
      longestStreak,
      currentLongest
    );

    currentLongest = 1;
  }
}

if (studyDays.length > 0) {
  longestStreak = Math.max(
    longestStreak,
    currentLongest
  );
}
let currentStreak = 0;

const daySet = new Set(studyDays);

const today = new Date()
  .toISOString()
  .split("T")[0];

const yesterdayDate = new Date();
yesterdayDate.setDate(
  yesterdayDate.getDate() - 1
);

const yesterday = yesterdayDate
  .toISOString()
  .split("T")[0];

let checkDate = null;

if (daySet.has(today)) {
  checkDate = new Date();
} else if (daySet.has(yesterday)) {
  checkDate = yesterdayDate;
}
while (checkDate) {
  const day = checkDate
    .toISOString()
    .split("T")[0];

  if (daySet.has(day)) {
    currentStreak++;

    checkDate.setDate(
      checkDate.getDate() - 1
    );
  } else {
    break;
  }
}
    res.json({currentStreak, longestStreak });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;