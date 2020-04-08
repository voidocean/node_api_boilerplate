const { fetchUserByEmail, validate_password, encodeJWT, decodeJWT, create_user_session, fetchUserSessionByTokens } = require('./authentication.services')
let error401 = new Error('credential is wrong')
error401.statusCode = 401 
exports.authenticate = async(email, password) => {

    const user = await fetchUserByEmail(email);
    if(!user){
        throw  error401
    }
    const is_password_validated = await validate_password(password, user.password);
    
    if(is_password_validated){
        let expiry_date = new Date();
        expiry_date.setHours(expiry_date.getHours()+24)
        const jwtToken = await encodeJWT({ id: user.id, email: user.email, expires: expiry_date})
        await create_user_session(user.id, jwtToken, expiry_date)
        return {token: jwtToken};
    } else {
        throw  error401
    }
    
}

exports.validateToken = async (token) =>{
    const decoded_token = await decodeJWT(token);
    const user_session = await fetchUserSessionByTokens(decoded_token, token);
    
    if(user_session.status === 'Active'){
        return true
    } else {
       return false
    }
}

exports.splitToken = (authorization) => {
    const token = authorization.split(' ')[1];
    return token
}

