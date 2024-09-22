const express = require('express')
const router = express.Router()
const { getUserData, updateUserData, changePassword } = require('../controller/DashboardController')
const uploads = require('../Middleware/upload')


router.route('/dashboard').get(getUserData)
router.route('/updateuser').patch(uploads.single('avatar'), updateUserData)
router.route('/changepassword').patch(changePassword)

module.exports = router;