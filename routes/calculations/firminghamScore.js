const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../helpers/requireAuth");
const { Firmingham } = require("../../controllers/firmingham");

router.use(requireAuth);
router.post("/firminghamRisk", Firmingham);

module.exports = router;
