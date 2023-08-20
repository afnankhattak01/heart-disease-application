const axios = require("axios");
const Joi = require("joi");
const Users = require("../models/signup");
const firminghamSchema = require("../models/firminghamRisk");

const firminghamScore = Joi.object({
  gender: Joi.string().required("Gender is a required field!"),
  total_cholesterol: Joi.number().required("Total cholesterol is required!"),
  hdl_cholesterol: Joi.number().required("HDL cholesterol is required!"),
  systolic_bp: Joi.number().required("Systolic BP is required!"),
  smoker: Joi.number().required("Smoker is required!"),
  bp_treatment: Joi.number().required("BP treatment is required!"),
  age: Joi.number().required("Age is required!"),
});
const Firmingham = async (req, res) => {
  const { error, value } = firminghamScore.validate(req.body, {
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
      "https://sdlc4ml.ixxhar.com/MedicalAnalysis/FraminghamRiskCalculator",
      req.body
    );
    if (resp.status === 200 && req.user._id) {
      try {
        const user = await Users.findById(req.user._id);
        if (user) {
          try {
            const hDraft = await firminghamSchema.create({
              ...req.body,
              user: req.user._id,
              result: resp.data,
            });

            const newEntry = await hDraft.save();
            return res.status(200).json({
              success: true,
              message: "Successfully calculated Framingham Risk!",
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

module.exports = { Firmingham };
