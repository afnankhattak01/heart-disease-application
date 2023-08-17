const axios = require("axios");
const Users = require("../models/signup");
const heartDiseaseSchema = require("../models/hearddiseas");

const predictHeartDisease = async (req, res) => {
  const data = req.body;

  try {
    const resp = await axios.post(
      "https://sdlc4ml.ixxhar.com/MedicalAnalysis/HeartDisease/Predict",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (req.user._id) {
      try {
        const user = await Users.findById(req.user._id);
        if (user) {
          try {
            const hDraft = await heartDiseaseSchema.create({
              ...req.body,
              user: req.user._id,
              result: resp.data.Prediction,
            });

            const newEntry = await hDraft.save();
            return res.status(200).json({
              success: true,
              message: "Successfully predicted new heart disease",
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
    return res.status(500).json({
      success: false,
      message: "Error while predicting heart disease",
      error,
    });
  }
};

module.exports = { predictHeartDisease };
