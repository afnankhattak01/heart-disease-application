const express = require("express");
const router = express.Router();
const graceSchema = require("../../models/graceRiskModal");
const { requireAuth } = require("../../helpers/requireAuth");
const { Grace } = require("../../controllers/newgracerisk");

router.use(requireAuth);

router.post("/graceriskcalculate", Grace);

module.exports = router;
