const Joi = require("joi");
const Users = require("../models/signup");

const profileSchema = Joi.object({
  username: Joi.string().required("user name is required field!"),
  emailaddress: Joi.string().required("email address is required field!"),
});

const ProfileController = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({
      success: false,
      message: "User not Available!",
    });
  }
  const { error, value } = profileSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }

  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Available!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error,failed to find and update credentials!",
      data: error,
    });
  }
};

module.exports = { ProfileController };
