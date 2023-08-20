const mongoose = require("mongoose");
const schema = mongoose.Schema;

const firminghamSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "users",
    },

    result: {
      type: Object,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    total_cholesterol: {
      type: Number,
      required: true,
    },

    hdl_cholesterol: {
      type: Number,
      required: true,
    },
    systolic_bp: {
      type: Number,
      required: true,
    },
    smoker: {
      type: Number,
      required: true,
    },
    bp_treatment: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("firmingham", firminghamSchema);
