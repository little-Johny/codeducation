const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { config } = require("./config");
const { User } = require("../db/models");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

module.exports = (passport) => {
  console.log("✅ Estrategia JWT cargada");
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.id);
        if (!user) {
          return done(null, false);
        }
        delete user.dataValues.password;
        return done(null, user); // inyecta el user en req.user
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
