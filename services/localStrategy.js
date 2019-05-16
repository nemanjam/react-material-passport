const passport = require("passport");
const User = require("../models/User");
const PassportLocalStrategy = require("passport-local").Strategy;

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.trim() });
      if (!user) {
        return done(null, false);
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(passportLogin);
