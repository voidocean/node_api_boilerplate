const express = require('express');
const passport = require("passport");



// local import



const app = express();
require("./middlewares/passport");
app.use(passport.initialize());
app.use(passport.session());
require('./routes')(app);

module.exports = app;
