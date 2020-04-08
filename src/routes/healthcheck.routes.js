const { auth_required } = require('../middlewares/authentication')
module.exports = (app) => {

    app.get('/healthcheck', auth_required,  (req, res, next) => {
        
        return res.status(201).json('Health Check')
    })
    app.get('/', (req, res, next) => {
        return res.status(201).json('home')
    })

}