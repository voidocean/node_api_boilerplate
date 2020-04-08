const { User, User_session } = require('../../models')
let jwt = require("jwt-simple");
const bcryptjs = require('bcryptjs')
const { authentication } = require('../../config')
exports.fetchUserByEmail= async (email) => {
    
    const user = await User.findOne({ where: { email: email } });

    return user
    
}
exports.fetchUserSessionByTokens = async (decoded_token, token) => {
    
    const user_session = await User_session.findOne({ 
        where: { user_id: decoded_token.id, token: token, expiry_date: decoded_token.expires, status: 'Active' } 
    });

    return user_session
    
}


exports.validate_password = async (password, user_password) => {
    
    const result = await bcryptjs.compare(password, user_password);
    
    return result
}

exports.encodeJWT = async (payload) => {
    
    var token = jwt.encode(payload, authentication.jwtSecret);
    
    return token
}

exports.decodeJWT = async (token) => {
    
    var decodd_token = jwt.decode(token, authentication.jwtSecret);
    
    return decodd_token
}

exports.create_user_session = async (user_id, token, expiry_date) => {
    const result = await User_session.create({ user_id, token, expiry_date, status: 'Active' })
    return result
}