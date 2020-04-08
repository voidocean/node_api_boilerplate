const { authenticate, validateToken, splitToken, signout } = require('./authentication.flows');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const result = await authenticate(email, password);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

exports.checkToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        
        const token = splitToken(authorization)
        const is_valid = await validateToken(token)        
        if(is_valid){
            return res.status(200).json({token: token})
        } else {
            return res.status(401).json({ message: 'token is not valid' })
        }
    } catch (error) {
        next(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const user_session  = req.user_session
        const token = splitToken(authorization)
        
        const was_user_session_deactivated = await signout(user_session, token);
        
        if(was_user_session_deactivated){
            return res.status(200).json({ message: 'sign out successful' })
        } else {
            return res.status(500).json({ message: 'sign out failed' })
        }
        
    } catch (error) {
        next(error)
    }
}