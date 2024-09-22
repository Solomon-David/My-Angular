const User = require('../Model/User')
const getUserData = async (req, res) => {
    // Get data regarding user that logged in
    const { userId } = req.user
    const getdata = await User.findOne({ _id: userId }).select("-password")
    res.status(200).json({ getdata })
}

const updateUserData = async (req, res) => {
    try {
        const { username, email, firstname, lastname } = req.body

        if (!(username && email && firstname && lastname)) {
            res.status(400).json({ msg: 'input all field' })
        }
        const user = await User.findOne({ _id: req.user.userId })
        user.lastname = lastname
        user.firstname = firstname
        user.email = email
        user.username = username

        await User.save()
    } catch (err) {
        console.log(err)
    }

    res.status()
}
const changePassword = async (req, res) => {
    const { newpassword, oldpassword } = req.body
    if (!newpassword || !oldpassword) {
        return res.status(401).send('please provide both values')
    }
    const user = await User.findOne({ _id: req.user.userId })

    const isPasswordCorrect = await user.comparePassword(oldpassword)
    if (!isPasswordCorrect) {
        return res.status(403).json({ msg: 'incorrect password' })
    }
    user.password = newpassword
    await user.save();
    res.status(200).json({ msg: 'Success! Password Updated.' });
}
module.exports = {
    getUserData,
    updateUserData,
    changePassword
}