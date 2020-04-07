const { login } = require('../domains/authentication/authentication.controller')
const authentication_validator = require('../domains/authentication/authentication.validator')
const { validationResponse } = require('../middlewares/validationResponse')
module.exports = (app) => {
    app.post('/login', authentication_validator.validate('login'), validationResponse, login)
    
}