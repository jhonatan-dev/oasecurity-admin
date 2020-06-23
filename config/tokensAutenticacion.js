"use strict";

const md5Config = require("../config/md5Config");

module.exports = {
  tokenLoginSuccess: md5Config.generateHash("loginSuccess"),
  tokenLoginNotSuccess: md5Config.generateHash("LoginNotSuccess"),
  tokenLoginFacialSuccess: md5Config.generateHash("loginFacialSuccess"),
  tokenLoginFacialNotSuccess: md5Config.generateHash("LoginFacialNotSuccess"),
  tokenLoginVoiceSuccess: md5Config.generateHash("loginVoiceSuccess"),
  tokenLoginVoiceNotSuccess: md5Config.generateHash("LoginVoiceNotSuccess"),
};
