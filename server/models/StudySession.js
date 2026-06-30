const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number, // minutes
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    sessionType: {
      type: String,
      enum: ["study", "pomodoro"],
      default: "study",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudySession",
  studySessionSchema
);