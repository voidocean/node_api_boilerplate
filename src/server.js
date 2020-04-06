const app = require('./app')
const config = require('./config');
const db = require('./models')

console.log('this will sync your table to your database')
console.log('and the console should read out Executing (default): CREATE TABLE IF NOT EXISTS "TABLE NAME"....')
db.sequelize.sync();

const port = config.port;
    app.listen(port, () => {
    console.log(`listening on ${port}`);
});