const { getUser, createUser, updateUser, deleteUser } = require('../domains/user/user.controller')
const user_validator = require('../domains/user/user.validator')
const { validationResponse } = require('../middlewares/validationResponse')
module.exports = (app) => {
    app.get('/user/:id', user_validator.validate('getUser'), validationResponse, getUser)
    app.post('/user', user_validator.validate('createUser'), validationResponse, createUser)
    app.put('/user', user_validator.validate('updateUser'), validationResponse, updateUser)
    app.delete('/user/:id', user_validator.validate('deleteUser'), validationResponse,deleteUser)
}