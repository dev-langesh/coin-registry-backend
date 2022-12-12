const express = require("express");
const { registerRouter } = require("./routes/register/register.route");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const { recordRouter } = require("./routes/records/records.route");

const app = express();

// configure cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/user/", registerRouter);
app.use("/records/", recordRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

module.exports = { app };
