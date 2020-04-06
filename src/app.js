const express = require('express');

// local import
const config = require('./configs');

const app = express();

require('./routes')(app);

app.use(function (err, req, res, next) {
  console.error('ERROR',err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app;