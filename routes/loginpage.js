const express = require("express");
const router = express.Router();
const usersSchema = require("../models/signup");
const mkdirp = require("mkdirp");
const {
  PasswordEncryption,
  passwordComparison,
} = require("../helpers/passwordEnc");
const CreateToken = require("../helpers/jwt");
const {
  CryptoEncyption,
  CryptoDecryption,
} = require("../helpers/tokeneEcryption");
router.post("/logindata", async (req, res) => {
  const { username, emailaddress, password } = req.body;

  try {
    const isuserAvailable = await usersSchema.findOne({
      emailaddress: emailaddress,
    });
    if (isuserAvailable) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await PasswordEncryption(password);

    const newUserInsertion = new usersSchema({
      username,
      emailaddress,
      password: hashedPassword,
    });

    const newUserSaved = await newUserInsertion.save();

    if (!newUserSaved) {
      return res.json({
        success: false,
        message: "unable to create account,try again",
      });
    }
    let istoken = CreateToken(newUserSaved);

    return res.json({
      success: true,
      message: "Account has Been created successfully.",
      newUserSaved,
      jwttoken: istoken,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "unable to create account,try again",
      error: error.message,
    });
  }
});

// login page module !!!

router.post("/verifyloginpage", async (req, res) => {
  const { emailaddress, password } = req.body;
  try {
    const isUserAValidUser = await usersSchema.findOne({ emailaddress });

    if (isUserAValidUser) {
      const isPasswordValid = await passwordComparison(
        password,
        isUserAValidUser.password
      );

      if (isPasswordValid) {
        let istoken = CreateToken(isUserAValidUser);
        return res.json({
          success: true,
          message: "Login Success",
          isUserAValidUser,
          jwttoken: istoken,
        });
      }
      return res.json({
        success: false,
        message: "You are not Authorized,try again!",
      });
    }
    return res.json({
      success: false,
      message: "You are not Authorized,try again!",
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: "You are not Authorized,try again!",
      error: error,
    });
  }
});

module.exports = router;
