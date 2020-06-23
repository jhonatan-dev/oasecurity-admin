"use strict";

const crypto = require("crypto");

const md5Config = {};

md5Config.generateHash = (valueString) => {
  return crypto.createHash("md5").update(valueString).digest("hex");
};

md5Config.compareHashes = (oldHash, newHash) => {
  return oldHash === newHash;
};

module.exports = md5Config;
