require("dotenv").config();
const express = require("express");
const app = express();
const expressJwt = require("express-jwt");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3001"],
};

const expressJwtOptions = {
  secret: "hello",
  algorithms: ["HS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.cookies.token) return req.cookies.token;
    return null;
  },
};

const expressJwtUnless = {
  path: [
    // /^\/*/,
    { url: /^\/api\/v2\/users$/, methods: ["POST"] },
    // { url: /^\/api\/v2\/users\/([^/]*)\/auth$/, methods: ["GET"] },
    { url: /^\/api\/v2\/admin\/login$/, methods: ["POST"] },
  ],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(expressJwt(expressJwtOptions).unless(expressJwtUnless));

app.use("/api/v2/users", require("./router/users"));
app.use("/api/v2/admin", require("./router/admin"));

app.use((err, req, res, next) => {
  if (err.code === "credentials_required")
    return res.send({ success: false, message: "未帶有訪問令牌" });
  if (err.code === "invalid_token")
    return res.send({ success: false, message: "無效的訪問令牌" });
  return next();
});

app.listen(3000);
