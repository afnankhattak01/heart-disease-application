const express = require("express");
const router = express.Router();
const graceSchema = require("../../models/graceRiskModal");
const firminghamSchema = require("../../models/firminghamRisk");
const timiSchema = require("../../models/timiRisk");
const { requireAuth } = require("../../helpers/requireAuth");

router.use(requireAuth);
router.post("/deleteRecord", async (req, res) => {
  const { emailAddress, modalType } = req.body;
  try {
    switch (modalType) {
      case "FIRMINGHAM":
        const isDeleted = await firminghamSchema.deleteMany({ emailAddress });
        return res.status(200).json({
          success: true,
          message: "Sucessfully Deleted Record",
        });
      case "GRACE":
        const isDeletedGrace = await graceSchema.deleteMany({ emailAddress });
        return res.status(200).json({
          success: true,
          message: "Sucessfully Deleted Record",
        });
      case "TIMI":
        const isDeletedTimi = await timiSchema.deleteMany({ emailAddress });
        return res.status(200).json({
          success: true,
          message: "Sucessfully Deleted Record",
        });

      default:
        return res.status(500).json({
          success: false,
          message: "Failed to delete record",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete record",
    });
  }
});

module.exports = router;
