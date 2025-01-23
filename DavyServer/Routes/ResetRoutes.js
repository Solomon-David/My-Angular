const express = require("express")
const Router = new express.Router()
const { resetPassword, validateOtp } = require('../controller/ResetController')

Router.route("/validate").post(validateOtp)
Router.route("/resetPassword").post(resetPassword)