const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("../config/keys");
const User = require("../models/User");

// JWT strategy
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
    secretOrKey: keys.secretOrKey
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }
);

passport.use(jwtLogin);
