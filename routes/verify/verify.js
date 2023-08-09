const express = require("express");

const router = express.Router();
const crypto = require("crypto");
const UserSchema = require("../../models/signup");
const nodemailer = require("nodemailer");

const Transport = require("nodemailer-sendinblue-transport");
const transporter = nodemailer.createTransport(
  new Transport({ apiKey: process.env.SEND_IN_BLUE_API_KEY })
);
const bcrypt = require("bcrypt");
router.post("/verifyemail", async (req, res) => {
  const { emailAddress } = req.body;
  const isEmailValid = await UserSchema.findOne({ emailaddress: emailAddress });
  if (!isEmailValid) {
    return res.status(500).json({
      success: false,
      message: "Email address not availble!",
    });
  }

  let resetToken = await isEmailValid.getResetPasswordToken();
  let setReset = await isEmailValid.save();

  // console.log("reset token",setReset)

  try {
    let isSend = await transporter.sendMail({
      from: process.env.FROM,
      to: emailAddress,
      subject: "Password Reset",
      html: `<a href="http://localhost:3000/resetpassword/${resetToken}">Click here to reset password</a>`,
    });

    if (isSend) {
      return res.status(200).json({
        success: true,
        message: "Please Check Email to Reset Password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please Check Email to Reset Password",
    });
  }
});

router.post("/resetPasswrd", async (req, res) => {
  const { resettoken, password } = req.body;
  const saltRounds = 10;
  const HashedToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  let findUser = await UserSchema.findOne({
    passwordresetToken: HashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (findUser) {
    try {
      let salt = await bcrypt.genSalt(saltRounds);

      let hasedPassword = await bcrypt.hash(password, salt);

      let newPassword = await UserSchema.findOneAndUpdate(
        { passwordresetToken: HashedToken },
        { password: hasedPassword },
        { new: true }
      );

      if (newPassword) {
        return res.status(200).json({
          success: true,
          message: "Password Reset Successfully !",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed Updating Password",
      });
    }
  }

  console.log("could not find the user!");

  return res.status(500).json({
    success: false,
    message: "Failed Updating Password",
  });
});

module.exports = router;
