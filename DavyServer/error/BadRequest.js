const customApiError = require('./CustomErrorAPI');

class BadRequest extends customApiError {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequest