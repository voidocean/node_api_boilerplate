var passport = require("passport");
const { User, User_session } = require('../models')
exports.auth_required = async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (payload) => {
        
        if(!payload){
            return res.status(403).json({message: 'access denied'});
        } else {
            const { authorization } = req.headers
            const token = authorization.split(' ')[1];
            
            const user_session = await User_session.findOne({ where: { user_id: payload.id, token:token, expiry_date: payload.expires, status: 'Active' }})
            console.log(user_session)
            if(user_session){
                const user = await User.findOne({ where: { id: payload.id}})
                req.user_session = user
                next()
            } else {
                return res.status(403).json({message: 'access denied'});
            }
            
        }
    })(req, res, next);
}

