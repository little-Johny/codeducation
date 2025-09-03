const { Stratefy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { config } = require("./config");
const User = require("../db/models/user");


const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opt, async (jwt_payload, done) => {
      try {
        const user = await User.findByPK(jwt_payload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};