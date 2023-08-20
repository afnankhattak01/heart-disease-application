const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TimiSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "users",
    },

    result: {
      type: Object,
      required: true,
    },
    q1: {
      type: String,
      required: true,
    },
    q2: {
      type: String,
      required: true,
    },

    q3: {
      type: String,
      required: true,
    },

    q4: {
      type: String,
      required: true,
    },
    q5: {
      type: String,
      required: true,
    },
    q6: {
      type: String,
      required: true,
    },
    q7: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimiRisk", TimiSchema);
