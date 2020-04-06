const express = require('express');



// local import



const app = express();

require('./routes')(app);

module.exports = app;
