export const getDashboard = async (req, res) => {
  try {
    res.json({
      message: "Dashboard data",
      user: req.user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};