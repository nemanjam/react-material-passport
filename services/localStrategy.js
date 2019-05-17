const passport = require("passport");
const User = require("../models/User");
const PassportLocalStrategy = require("passport-local").Strategy;
const Joi = require("joi");

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    const schema = Joi.object().keys({
      email: Joi.string()
        .trim()
        .email()
        .required(),
      password: Joi.string()
        .trim()
        .min(6)
        .max(12)
        .required()
    });

    try {
      const form = await Joi.validate(req.body, schema);
    } catch (err) {
      return done(null, false, { message: err.details[0].message });
    }
    try {
      const user = await User.findOne({ email: email.trim() });
      if (!user) {
        return done(null, false, { message: "Email does not exists." });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(passportLogin);
