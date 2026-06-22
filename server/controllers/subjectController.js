const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      userId: req.user.id,
      name: req.body.name,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      userId: req.user.id,
    });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};