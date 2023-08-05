const mongoose = require("mongoose");

const schema = mongoose.Schema;

const timiRiskSchema = new schema(
  {
    modalType: {
      type: String,
      default: "TIMI",
    },

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

    killip: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    angina: {
      type: Boolean,
      required: true,
    },
    LBBB: {
      type: Boolean,
      required: true,
    },
    timetoTreatment: {
      type: Number,
      required: true,
    },

    timiRisk: {
      type: Number,
      required: true,
    },
    riskPercentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("timiRisk", timiRiskSchema);
