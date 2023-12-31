const mongoose = require("mongoose");
const schema = mongoose.Schema;

const GracerSchema = new schema(
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
    bpsys: {
      type: Number,
      required: true,
    },

    pulse: {
      type: Number,
      required: true,
    },
    killip: {
      type: Number,
      required: true,
    },

    creat_mg: {
      type: Number,
      required: true,
    },
    stchange: {
      type: Number,
      required: true,
    },
    carrst: {
      type: Number,
      required: true,
    },
    posinit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gracer", GracerSchema);
