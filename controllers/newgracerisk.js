const axios = require("axios");
const Joi = require("joi");
const Users = require("../models/signup");
const GracerSchema = require("../models/graceRiskModal");

const GracerScore = Joi.object({
  killip: Joi.number().required("killip is required field!"),
  bpsys: Joi.number().required("bpsys is required field!"),
  pulse: Joi.number().required("pulse is required field!"),
  creat_mg: Joi.number().required("creat_mg is required field!"),
  age: Joi.number().required("age is required field!"),

  stchange: Joi.number().required("stchange is required field!"),

  posinit: Joi.number().required("posinit is required field!"),
  carrst: Joi.number().required("carrst is required field!"),
});
const Grace = async (req, res) => {
  const { error, value } = GracerScore.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }

  try {
    const resp = await axios.post(
      "https://sdlc4ml.ixxhar.com/MedicalAnalysis/GraceRiskScoreCalculator",
      req.body
    );
    if (resp.status === 200 && req.user) {
      try {
        const user = await Users.findById(req.user._id);
        if (user) {
          try {
            const hDraft = await GracerSchema.create({
              ...req.body,
              user: req.user._id,
              result: resp.data,
            });

            const newEntry = await hDraft.save();
            return res.status(200).json({
              success: true,
              message: "Successfully calculated Grace Risk!",
              data: {
                predictionDetails: newEntry,
                user: {
                  username: user.username,
                  emailaddress: user.emailaddress,
                },
              },
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Error while inserting new data in database",
              data: error,
            });
          }
        }
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
          data: error,
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User id not available!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: error,
    });
  }
};

module.exports = { Grace };
