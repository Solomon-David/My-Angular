const jwt = require('jsonwebtoken')
require('dotenv').config()
const checkUser = async (req, res, next) => {
    // const authHeader = req.headers.authorization
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ msg: 'Please Provide Authentication Token' })
    // }

    // const token = authHeader.split(' ')[1]
    // try {
    //     const decodedToken = jwt.verify(token, process.env.SECRET_PHASE)

    //     const { userId, username } = decodedToken
    //     req.user = { userId, username }
    //     next()
    // }
    // catch (err) {
    //     console.log(err)
    //     return res.status(500).json({ err })
    // }

    // cookie approach
    const token = req.cookies.authorizeuser;

    if (!token) {
        return res.status(401).json({ msg: 'Please Provide Authentication Token' })
    }
    try {
        const verify = jwt.verify(token, process.env.SECRET_PHASE);
        const { userId, username } = verify
        req.user = { userId, username }
        next()
    } catch (error) {
        return res.status(500).json({ error })

    }

}

module.exports = checkUser