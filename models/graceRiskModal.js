const mongoose = require("mongoose");

const schema = mongoose.Schema;

const graceRiskSchema = new schema(
  {
    modalType: {
      type: String,
      default: "GRACE",
    },

    emailAddress:{
      type:String,
      required:true
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
    Creatinine: {
      type: Number,
      required: true,
    },
    killIpClass: {
      type: String,
      required: true,
    },
    cardiacArrest: {
      type: Boolean,
      required: true,
    },
    stSegment: {
      type: Boolean,
      required: true,
    },
    abnormalCardiac: {
      type: Boolean,
      required: true,
    },
    graceRiskScore:{
      type:Number,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("graceRiskScore", graceRiskSchema);
