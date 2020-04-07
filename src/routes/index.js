
const bodyParser = require('body-parser')

const { errorHandling } = require('../middlewares/errorHandling')
module.exports = (app) => {


    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(errorHandling)

    require('./user.routes')(app)
    require('./healthcheck.routes')(app)

}