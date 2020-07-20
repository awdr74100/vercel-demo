require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use("/api/v2/users", require("./router/users"));

app.listen(3000);
