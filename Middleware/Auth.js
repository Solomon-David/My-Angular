const jwt = require('jsonwebtoken')
require('dotenv').config()
const checkUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Provide Authentication Token' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_PHASE)

        const { userId, username } = decodedToken
        req.user = { userId, username }
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

module.exports = checkUser