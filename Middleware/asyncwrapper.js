const asyncwrapper = (cb) => {
    async (req, res, next) => {
        try {
            return cb(req, res)
        } catch (err) {
            next(err)
        }
    }

}