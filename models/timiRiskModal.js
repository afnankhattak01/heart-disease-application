const mongoose = require("mongoose");

const schema = mongoose.Schema;

const timiSchema = new schema(
  {
    emailAddress: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    systolicBloodPressure: {
      type: Number,
      required: true,
    },
    timetoTreatment: {
      type: Number,
      required: true,
    },
    killip: {
      type: String,
      required: true,
    },
    LBBB: {
      type: Boolean,
      required: true,
    },
    angina: {
      type: Boolean,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    timiScore: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("timiScore", timiSchema);
