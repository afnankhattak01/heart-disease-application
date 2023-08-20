const Users = require("../models/signup");
const UserController = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Not authorized for this request!", success: false });
  }

  try {
    const user = await Users.find({}).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Available!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List of Users fetched Successfully!",
      data: {
        users: user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error,failed to find and update credentials!",
      data: error,
    });
  }
};

module.exports = { UserController };
