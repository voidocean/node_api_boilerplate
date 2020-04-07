
const bodyParser = require('body-parser')
const { validationResponse } = require('../middlewares/validationResponse')
const { errorHandling } = require('../middlewares/errorHandling')
module.exports = (app) => {


    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(errorHandling)
    app.use(validationResponse)

    require('./user.routes')(app)
    require('./test.routes')(app)

}