const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../helpers/requireAuth");
const { ProfileController } = require("../../controllers/profile");

router.use(requireAuth);
router.put("/updateInfo", ProfileController);

module.exports = router;
