module.exports = (app) => {

    app.get('/healthcheck', (req, res, next) => {
        return res.status(201).json('Health Check')
    })

    app.get('/', (req, res, next) => {
        return res.status(201).json('home')
    })

}