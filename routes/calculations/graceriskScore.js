const express = require("express");
const router = express.Router();
const graceSchema = require("../../models/graceRiskModal");
const { requireAuth } = require("../../helpers/requireAuth");

router.use(requireAuth);

router.post("/gracerisk", async (req, res) => {
  const {
    patientAge,
    systolicBloodPressure,
    heartRate,
    abnormalCardiac,
    Killip,
    Creatinine,
    stSegment,
    cardiacArrest,
    graceScore,
    user: { emailaddress },
  } = req.body;

  try {
    const newGraceRiskScore = new graceSchema({
      emailAddress: emailaddress,
      patientAge,
      heartRate: heartRate,
      systolicBloodPressure,
      Creatinine,
      abnormalCardiac,
      killIpClass: Killip,
      stSegment,
      cardiacArrest,
      graceRiskScore: graceScore,
    });

    let newGraceDocuemnt = await newGraceRiskScore.save();

    res.status(200).json({
      success: true,
      message: "Successfully created New Grace Document",
      newGraceDocuemnt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Creating new Grace Risk Score",
    });
  }
});

module.exports = router;
