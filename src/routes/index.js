
const bodyParser = require('body-parser')

module.exports = (app) => {


    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())


    require('./user.routes')(app)

    app.get('/healthcheck', (req, res) => {
        return res.send('Health Check')
    })

    app.get('/', (req, res) => {
        return res.send('home')
    })

}