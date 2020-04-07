const { User } = require('../../models')
let jwt = require("jwt-simple");
const bcryptjs = require('bcryptjs')
const { authentication } = require('../../config')
exports.fetchUserByEmail= async (email) => {
    
    const user = await User.findOne({ where: { email: email } });

    return user
    
}

exports.validate_password = async (password, user_password) => {
    const result = await bcryptjs.compare(password, user_password);

    return result
}

exports.encodeJWT = async (payload) => {
    
    var token = jwt.encode(payload, authentication.jwtSecret);
    
    return token
}