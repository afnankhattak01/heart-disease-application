const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../helpers/requireAuth");
const { UserController } = require("../../controllers/usercontroller");

router.use(requireAuth);
router.get("/users", UserController);

module.exports = router;
