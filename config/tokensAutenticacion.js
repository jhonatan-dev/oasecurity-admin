"use strict";

const md5File = require("../config/md5Config");

module.exports = {
    tokenLoginSuccess = await md5File.generateHash("loginSuccess"),
    tokenLoginNotSuccess = await md5File.generateHash("LoginNotSuccess"),
    tokenLoginFacialSuccess = await md5File.generateHash("loginFacialSuccess"),
    tokenLoginFacialNotSuccess = await md5File.generateHash("LoginFacialNotSuccess"),
    tokenLoginVoiceSuccess = await md5File.generateHash("loginVoiceSuccess"),
    tokenLoginVoiceNotSuccess = await md5File.generateHash("LoginVoiceNotSuccess"),
}