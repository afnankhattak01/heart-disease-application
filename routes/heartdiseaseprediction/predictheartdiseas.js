const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../helpers/requireAuth");
const { predictHeartDisease } = require("../../controllers/predictheartdiseas");

// requests starts from here!
router.use(requireAuth);
router.post("/predictheartdisease", predictHeartDisease);

module.exports = router;
