const { login, checkToken, logout } = require('../domains/authentication/authentication.controller')
const authentication_validator = require('../domains/authentication/authentication.validator')
const { validationResponse } = require('../middlewares/validationResponse')
const { auth_required } = require('../middlewares/authentication')
module.exports = (app) => {
    app.post('/login', authentication_validator.validate('login'), validationResponse, login)
    app.delete('/logout', auth_required, logout)
    app.get('/checktoken', auth_required, checkToken)
    
}