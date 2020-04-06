const express = require('express');


// local import



const app = express();

require('./routes')(app);

app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
});

module.exports = app;
