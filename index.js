require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const fileUpload = require("express-fileupload");
const cors = require("cors");
const loginpage = require("./routes/loginpage");
const graceCalculation = require("./routes/calculations/graceriskScore");
const firminghamScore = require("./routes/calculations/firminghamScore");
const timiCalculation = require("./routes/calculations/timiroskCalc");
const fetcher = require("./routes/fetchRecord/fetch");
const deleter = require("./routes/deleteRecord/delete");
const verify = require("./routes/verify/verify");
const heartDiseasePrediction = require("./routes/heartdiseaseprediction/predictheartdiseas");
const passwordReset = require("./routes/passwordreset/passwordreset");
const profile = require("./routes/profile/profile");
const Users = require("./routes/users/users");

app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());
// all working apis so far!
app.use("/api/loginpage", loginpage);
app.use("/api/resetpassword", passwordReset);
app.use("/api/verify", verify);

// after login
app.use("/api/profile", profile);
app.use("/api/getAll", Users);
app.use("/api/heartdisease", heartDiseasePrediction);
app.use("/api/heartdisease/framinghamheartdisease", firminghamScore);
app.use("/api/graceriskcalculation", graceCalculation);
app.use("/api/timi", timiCalculation);
app.use("/api/fetchRecord", fetcher);

// api's to be resetted!

app.use("/api/delete", deleter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(`Server is up and running on PORT "${process.env.PORT}" `);
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
