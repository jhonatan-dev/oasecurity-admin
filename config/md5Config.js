"use strict";

const md5File = require("md5-file");

const md5Config = {};

md5Config.generateHash = async (valueString) => {
  return await md5File.sync(valueString);
};

md5Config.compareHashes = async (oldHash, newHash) => {
  return oldHash === newHash;
};

module.exports = md5Config;