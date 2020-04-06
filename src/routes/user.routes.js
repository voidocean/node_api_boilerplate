const { getUser, createUser, updateUser } = require('../domains/user/user.controller')

module.exports = (app) => {
    app.get('/user', getUser)
    app.post('/user', createUser)
    app.put('/user', updateUser)
}