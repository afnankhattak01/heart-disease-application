const axios = require("axios");
const Joi = require("joi");
const Users = require("../models/signup");
const TimiStemiSchema = require("../models/stemi");

const TimiValidations = Joi.object({
  q1: Joi.string().required("Question One is a required field!"),
  q2: Joi.string().required("Question Two is required field!"),
  q3: Joi.string().required("Question Three is required field!"),
  q4: Joi.string().required("Question Four is required field!"),
  q5: Joi.string().required("Question Five is required field!"),
  q6: Joi.string().required("Question Six is required field!"),
  q7: Joi.string().required("Question Seven is required field!"),
  q8: Joi.string().required("Question eight is required field!"),
  q9: Joi.string().required("Question nine is required field!"),
});
const TimiStemiController = async (req, res) => {
  const { error, value } = TimiValidations.validate(req.body, {
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
      "https://sdlc4ml.ixxhar.com/MedicalAnalysis/TimiStemiCalculator",
      req.body
    );
    if (resp.status === 200 && req.user._id) {
      try {
        const user = await Users.findById(req.user._id);
        if (user) {
          try {
            const hDraft = await TimiStemiSchema.create({
              ...req.body,
              user: req.user._id,
              result: resp.data,
            });

            const newEntry = await hDraft.save();
            return res.status(200).json({
              success: true,
              message: "Successfully calculated Timi Stemi Risk!",
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

module.exports = { TimiStemiController };
