const mongoose = require("mongoose");
const schema = mongoose.Schema;
const crypto = require("crypto");

const signUpSchema = new schema(
  {
    username: {
      type: String,
      required: true,
    },
    emailaddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },

    passwordresetToken: String,
    passwordtokenExpires: Date,
  },

  { timestamps: true }
);

signUpSchema.methods.getResetPasswordToken = function () {
  const resettoken = crypto.randomBytes(35).toString("hex");
  this.passwordresetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  this.passwordtokenExpires = Date.now() + 60 * 1000;

  return resettoken;
};

module.exports = mongoose.model("users", signUpSchema);
