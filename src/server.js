const app = require('./app')
const config = require('./config');
const db = require('./models')

db.sequelize.sync();

const port = config.port;
    app.listen(port, () => {
    console.log(`listening on ${port}`);
});