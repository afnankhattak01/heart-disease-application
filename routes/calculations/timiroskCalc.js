const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../helpers/requireAuth");
const { TimiController } = require("../../controllers/timi");
const { TimiStemiController } = require("../../controllers/timiforstemi");

router.use(requireAuth);
router.post("/timiriskCalculator", TimiController);

router.post("/timiriskCalculatorforstemi", TimiStemiController);

module.exports = router;
