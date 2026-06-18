const getProfile = (req, res) => {
  res.status(200).json({
    message: "Protected profile route",
    user: req.user,
  });
};

module.exports = { getProfile };