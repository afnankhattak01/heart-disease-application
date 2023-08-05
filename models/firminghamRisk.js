const mongoose = require("mongoose");

const schema = mongoose.Schema;

const firminghamSchema = new schema(
  {
    modalType: {
      type: String,
      default: "FIRMINGHAM",
    },

    emailAddress: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    hdlCholesterol: {
      type: Number,
      required: true,
    },
    systolicBloodPressure: {
      type: Number,
      required: true,
    },
    totalCholesterol: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    smoker: {
      type: Boolean,
      required: true,
    },
    bloodPressureTreated: {
      type: Boolean,
      required: true,
    },

    firminghamScore: {
      type: Number,
      required: true,
    },
    deathProbability: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("firminghamScore", firminghamSchema);
