const passport = require("passport");
const User = require("../models/User");
const PassportLocalStrategy = require("passport-local").Strategy;

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false
  },
  (email, password, done) => {
    User.findOne({ email: email.trim() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      user.comparePassword(password.trim(), (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }
);

passport.use(passportLogin);
