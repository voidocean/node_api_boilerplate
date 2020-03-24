const { getUser } = require('../domains/user/user.controller')

module.exports = (app) => {
    app.get('/user', getUser)
}