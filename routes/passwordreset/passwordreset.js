const express = require("express");
const router = express.Router();
const bcryt = require("bcrypt");
const Users = require("../../models/signup");
const { requireAuth } = require("../../helpers/requireAuth");
const Joi = require("joi");
const addNewPassword = Joi.object({
  password: Joi.string().min(3).max(32).required("Password is required!"),
  newPassword: Joi.string().min(3).max(32).required("Password is required!"),
});
// router.use(requireAuth);
router.post("/addnewpassword", async (req, res) => {
  const { error, value } = addNewPassword.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message),
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
    const isPasswordValid = await bcryt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      try {
        const salt = await bcryt.genSalt(10);
        const hashedPassword = await bcryt.hash(req.body.newPassword, salt);
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
