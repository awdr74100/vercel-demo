const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const token = jwt.sign({ id: "55q5d" }, "hello", { expiresIn: 60 * 15 });
  res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 15 });
  res.send({ success: true, message: "登入成功" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").send({ success: true, message: "已登出" });
});

module.exports = router;
