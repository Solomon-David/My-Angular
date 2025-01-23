const CustomAPIError = require('./CustomErrorAPI');
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    res.status(500).json({ msg: "Something went Wrong" })
    next()
}

module.exports = errorMiddleware