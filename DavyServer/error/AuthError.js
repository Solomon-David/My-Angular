const CustomAPIError = require('./CustomErrorAPI');

class AuthError extends CustomAPIError {
    constructor(message) {
        this.message = message
        this.statusCode = 401
    }
}

module.exports = AuthError