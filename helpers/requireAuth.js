const jwt = require("jsonwebtoken");
const signUpschema = require("../models/signup");

const requireAuth = async (req, res, next) => {
  console.log("req headers",req.headers)
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Not authorized for this request!", success: false });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await signUpschema
      .findOne({ _id: decoded.userid })
      .select("_id");
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Not authorized for this request!", success: false });
  }
};

module.exports = { requireAuth };
