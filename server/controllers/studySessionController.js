const StudySession = require("../models/StudySession");
const createSession = async (req, res) => {
  try {
    const {
      subjectId,
      startTime,
      endTime,
      duration,
      notes,
      sessionType,
    } = req.body;

    const session = new StudySession({
      userId: req.user.id,
      subjectId,
      startTime,
      endTime,
      duration,
      notes,
      sessionType,
    });

    await session.save();

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getSessions = async (req, res) => {
  try {
    const sessions =
      await StudySession.find({
        userId: req.user.id,
      }).populate("subjectId");

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getSessionById = async (req, res) => {
  try {
    const session =
      await StudySession.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateSession = async (req, res) => {
  try {
    const session =
      await StudySession.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.id,
        },
        req.body,
        { new: true }
      );

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteSession = async (req, res) => {
  try {
    const session =
      await StudySession.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json({
      message: "Session deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
};