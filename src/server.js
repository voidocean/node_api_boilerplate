const app = require('./app')
const config = require('./config');
const db = require('./models')

db.sequelize.sync();
// app.use(function (err, req, res, next) {
//     res.status(500).send({ message: error.message })
// });
const port = config.port;
    app.listen(port, () => {
    console.log(`listening on ${port}`);
});