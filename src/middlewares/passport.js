const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { authentication } = require('../config')
const { passport_jwt_strategy } = require('./passport-jwt')
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  authentication.jwtSecret
}
passport.use(new JwtStrategy(opts ,passport_jwt_strategy ) );
  