const express = require("express");
const router = express.Router();
const firminghamSchema = require("../../models/firminghamRisk");
const verifyToken = require("../../helpers/checkverify");

router.use(verifyToken);
router.post("/firminghamRisk", async (req, res) => {
  const {
    patientAge,
    systolicBloodPressure,
    bloodPressureTreated,
    smoker,
    totalCholesterol,
    gender,
    hdlCholesterol,

    firminghamScore,
    deathProbability,
    user: { emailaddress },
  } = req.body;

  try {
    const newFirminghameRiskScore = new firminghamSchema({
      emailAddress: emailaddress,
      patientAge,
      hdlCholesterol,
      systolicBloodPressure,
      totalCholesterol,
      gender,
      smoker,
      bloodPressureTreated,
      firminghamScore,
      deathProbability,
    });

    let newFirminghamDocuemnt = await newFirminghameRiskScore.save();

    res.status(200).json({
      success: true,
      message: "Successfully created New Grace Document",
      newFirminghamDocuemnt,
    });
  } catch (error) {
    console.log("new err", error);
    return res.status(500).json({
      success: false,
      message: "Error Creating new Grace  Firmingham Risk Score",
    });
  }
});

module.exports = router;
