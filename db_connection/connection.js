const mongoose = require("mongoose");
const Connection = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb+srv://Afnan:vsRNdYVON8KOV7iG@cluster0.9yjfa.mongodb.net/heart-disease?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    if (isConnected) {
      console.log("connected to database");
    }
  } catch (error) {
    console.log("error connecting to the database:", error.message);
  }
};

module.exports = Connection;
