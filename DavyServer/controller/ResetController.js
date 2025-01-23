const User = require('../Model/User')
const resetPassword = async (req, res) => {
    try {
        const { user } = req.user;

        if (!user) {
            res.status(400).json({ err: "User not found" })
        }
        user.password = password;
        await User.save()
    }
    catch (err) {
        res.status(500).json({ err: err.message })
    }

}


const validateOtp = (req, res) => {
    const { otp, user } = req.body
    if (!user) {
        res.status(400).json({ err: "User not found" })
    }
    if (user.otp !== otp) {
        res.status(400).json({ msg: "Invalid otp sent" })
    }

}

module.exports = { resetPassword, validateOtp }