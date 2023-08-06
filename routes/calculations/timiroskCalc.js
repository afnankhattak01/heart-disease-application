const express = require("express");
const router = express.Router();
const TimiRiskSchema = require("../../models/timiRisk");
const verifyToken = require("../../helpers/checkverify");

router.use(verifyToken);
router.post("/timirisk", async (req, res) => {
  const {
    patientAge,
    systolicBloodPressure,
    heartRate,
    weight,
    LBBB,
    killip,
    angina,
    timetoTreatment,
    timiScore,
    riskPPercentage,

    user: { emailaddress },
  } = req.body;

  try {
    const newTimiRiskScore = new TimiRiskSchema({
      emailAddress: emailaddress,
      patientAge,
      heartRate: heartRate,
      systolicBloodPressure,

      killip,
      LBBB,
      angina,
      weight,
      timetoTreatment,
      timiRisk: timiScore,
      riskPercentage: riskPPercentage,
    });

    let newTimiDocuemnt = await newTimiRiskScore.save();

    res.status(200).json({
      success: true,
      message: "Successfully created New Timi Document",
      newTimiDocuemnt,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error Creating new Timi Risk Score",
    });
  }
});

module.exports = router;
