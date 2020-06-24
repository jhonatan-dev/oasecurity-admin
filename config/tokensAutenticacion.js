"use strict";

const md5Config = require("../config/md5Config");

module.exports = {
  tokenLoginSuccess: md5Config.generateHash("loginSuccess"),
  tokenLoginFacialSuccess: md5Config.generateHash("loginFacialSuccess"),
  tokenLoginVoiceSuccess: md5Config.generateHash("loginVoiceSuccess"),
};
