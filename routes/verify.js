const router = require("express").Router();
const verifier = require("../helpers/checkverify");
router.post("/verifycredentials", verifier, async (req, res) => {
  return res.json({
    success: false,
    message: "User UnAuthorized",
  });
});

module.exports = router;