const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send({ success: true, message: "成功請求" });
});

router.post("/env", (req, res) => {
  res.send({ success: true, message: process.env.TEST_PATH });
});

module.exports = router;
