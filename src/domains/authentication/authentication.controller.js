const { authenticate } = require('./authentication.flows');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authenticate(email, password);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}