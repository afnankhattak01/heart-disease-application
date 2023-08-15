const express = require("express");
const router = express.Router();
const bcryt = require("bcrypt");
const Users = require("../../models/signup");
const { requireAuth } = require("../../helpers/requireAuth");

router.use(requireAuth);
router.post("/addnewpassword", async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    return res.status(400).json({
      message: "Missing password or new Password field!",
      success: false,
    });
  }

  try {
    const user = await Users.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // comment!
    const isPasswordValid = await bcryt.compare(password, user.password);
    if (isPasswordValid) {
      try {
        const salt = await bcryt.genSalt(10);
        const hashedPassword = await bcryt.hash(newPassword, salt);
        user.password = hashedPassword;
        const newUser = await user.save();
        if (newUser) {
          return res.status(200).json({
            success: true,
            message: "Password changed successfully!",
          });
        } else {
          return res.status(500).json({
            success: false,
            message: "Internal server error!",
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error!",
          data: error,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is not valid!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      data: error,
    });
  }
});

module.exports = router;
