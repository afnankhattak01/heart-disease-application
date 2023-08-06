const jwt = require("jsonwebtoken");
const { CryptoDecryption } = require("../helpers/tokeneEcryption");
const signUpschema = require("../models/signup");

const ChecVerify = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  let decryptedToken = CryptoDecryption(token);

  try {
    let decoded = jwt.verify(decryptedToken, process.env.JWT_SECRET);

    if (decoded) {
      const userCredentails = await signUpschema.findOne(
        { _id: decoded.userid },
        { password: 0 }
      );
      if (userCredentails) {
        return res.json({
          success: true,
          message: "User Verfied",
          user: userCredentails,
        });
      }

      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User UnAuthorized",
    });
  }
};

module.exports = ChecVerify;
