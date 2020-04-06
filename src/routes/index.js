
const bodyParser = require('body-parser')

module.exports = (app) => {


    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())


    require('./user.routes')(app)

    app.get('/healthcheck', (req, res) => {
        return res.status(201).json('Health Check')
    })

    app.get('/', (req, res) => {
        return res.status(201).json('home')
    })

}