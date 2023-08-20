const express = require("express");
const router = express.Router();
const UsersSchema = require("../../models/signup");

const graceSchema = require("../../models/graceRiskModal");
const firminghamSchema = require("../../models/firminghamRisk");
const timiSchema = require("../../models/timiRisk");
const { requireAuth } = require("../../helpers/requireAuth");

router.use(requireAuth);
router.get("/fetch", async (req, res) => {
  const { email, type } = req.query;
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized for this request!",
    });
  }
  if (!email || !type) {
    return res.status(400).json({
      success: false,

      message: "please provide email and type",
    });
  }

  try {
    const userFound = await UsersSchema.findOne({
      emailaddress: email,
    });

    if (!userFound) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    try {
      if (type == "GR") {
        try {
          const graceResult = await graceSchema.find({ user: userFound._id });
          return res.status(200).json({
            data: {
              gracer: {
                result: graceResult,
              },
            },
            message: "successfully fetched gracer risk results",
            success: true,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: `unable to retrieve data!${error.message}`,
          });
        }
      } else if (type == "FM") {
        try {
          const firmingham = await firminghamSchema.find({
            user: userFound._id,
          });
          return res.status(200).json({
            data: {
              firmingham: {
                result: firmingham,
              },
            },
            message: "successfully fetched firmingham risk results",
            success: true,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: `unable to retrieve data!${error.message}`,
          });
        }
      } else if (type == "TI") {
        try {
          const timiSchemaR = await timiSchema.find({ user: userFound._id });
          return res.status(200).json({
            data: {
              timi: {
                result: timiSchemaR,
              },
            },
            message: "successfully fetched timi risk results",
            success: true,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: `unable to retrieve data!${error.message}`,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        messae: `unable to retrieve data!${error.message}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `unable to retrieve data!${error.message}`,
    });
  }
});

module.exports = router;
