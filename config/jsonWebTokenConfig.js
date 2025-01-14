"use strict";

const jwt = require("jsonwebtoken");

const jsonWebTokenConfig = {};

jsonWebTokenConfig.sign = (jwt_payload) => {
  return jwt.sign(jwt_payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

jsonWebTokenConfig.signCustomWithoutExpiration = (jwt_payload, jwt_secret) => {
  return jwt.sign(jwt_payload, jwt_secret);
};

jsonWebTokenConfig.verify = (jwt_token) => {
  return jwt.verify(jwt_token, process.env.JWT_SECRET);
};

module.exports = jsonWebTokenConfig;
