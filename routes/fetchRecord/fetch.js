const express = require("express");
const router = express.Router();
const graceSchema = require("../../models/graceRiskModal");
const firminghamSchema = require("../../models/firminghamRisk");
const timiSchema = require("../../models/timiRisk");

router.get("/fetch", async (req, res) => {
  const { email, type } = req.query;

  try {
    if (type == "GR") {
      const graceResult = await graceSchema.find({ emailAddress: email });
      return res.status(200).json({
        data: graceResult,
      });
    } else if (type == "FM") {
      const firmingham = await firminghamSchema.find({ emailAddress: email });
      return res.status(200).json({
        data: firmingham,
      });
    } else if (type == "TI") {
      const timiSchemaR = await timiSchema.find({ emailAddress: email });
      return res.status(200).json({
        data: timiSchemaR,
        success:true,
        

      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      messae: `unable to retrieve data!${error.message}`,
    });
  }
});

module.exports = router;
