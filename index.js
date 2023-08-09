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

app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());
app.use("/api/loginpage", loginpage);

app.use("/api/riskcalculation", graceCalculation);
app.use("/api/firmingham", firminghamScore);
app.use("/api/timi", timiCalculation);
app.use("/api/fetchRecord", fetcher);
app.use("/api/delete", deleter);
app.use("/api/verify", verify);

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
