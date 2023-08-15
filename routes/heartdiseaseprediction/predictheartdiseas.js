const express = require("express");
const router = express.Router();
const axios = require("axios");
const { requireAuth } = require("../../helpers/requireAuth");
const Users = require("../../models/signup");
const heartDiseaseSchema = require("../../models/hearddiseas");
router.use(requireAuth);
router.post("/predictheartdisease", async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.user", req.user._id);

  //   const data = req.body;
  //   console.log("data", data);

  //   try {
  //     const resp = await axios.post(
  //       "https://sdlc4ml.ixxhar.com./MedicalAnalysis/HeartDisease/Predict",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return res.status(resp.status).json({
  //       data: resp,
  //       data,
  //     });
  //   } catch (error) {
  //     console.log("Err", error.response);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Error while predicting heart disease",
  //       error,
  //     });
  //   }
  if (req.user._id) {
    try {
      const user = await Users.findById(req.user._id);
      console.log("user", user);
      if (user) {
        try {
          const hDraft = await heartDiseaseSchema.create({
            ...req.body,
            user: req.user._id,
            result: "person has disease!!",
          });

          const newEntry = await hDraft.save();
          return res.status(200).json({
            success: true,
            message: "successfully  predicted new heart disease",
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
            message: "Error while  inserting new data in database",
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
});

module.exports = router;
