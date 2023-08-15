const mongoose = require("mongoose");
const schema = mongoose.Schema;

const heartDiseaseSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "users",
    },

    result: {
      type: String,
      required: true,
    },
    Age: {
      type: String,
      required: true,
    },
    Sex: {
      type: String,
      required: true,
    },
    ChestPain: {
      type: String,
      required: true,
    },
    RestingBP: {
      type: String,
      required: true,
    },
    Cholesterol: {
      type: String,
      required: true,
    },
    FastingBS: {
      type: String,
      required: true,
    },
    RestingECG: {
      type: String,
      required: true,
    },
    MaxHR: {
      type: String,
      required: true,
    },
    ExerciseAngina: {
      type: String,
      required: true,
    },
    OldSpeak: {
      type: String,
      required: true,
    },
    ST_Slope: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("heartDiseasePredictions", heartDiseaseSchema);
