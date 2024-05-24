//Express
const express = require("express");
const app = express();

//3rd Party Modules
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

// Database Config + Connect to Database
const connectDB = require("./config/database.config");
connectDB();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));

module.exports = app;
