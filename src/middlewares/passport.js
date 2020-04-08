const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User, User_session } = require('../models')
const { authentication } = require('../config')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  authentication.jwtSecret
}


passport.use(
    new JwtStrategy(opts, async function(jwt_payload, next) {
        try {
            console.log(jwt_payload)
            if(jwt_payload){
                return next(jwt_payload);
                
            } else {
                return next(false);
            }
            
          
        } catch (err) {
            return next(false, err);
        }
    })
);
  