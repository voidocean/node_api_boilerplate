const { fetchUserByEmail, validate_password, encodeJWT } = require('./authentication.services')

exports.authenticate = async(email, password) => {

    const user = await fetchUserByEmail(email);
    if(!user){
        throw  new Error('credential is wrong') 
    }
    const is_password_validated = validate_password(password, user.password);
    if(is_password_validated){
        const jwtToken = await encodeJWT({ id: user.id, email: user.email})
        return {token: jwtToken};
    } else {
        throw  new Error('credential is wrong') 
    }
    
}
