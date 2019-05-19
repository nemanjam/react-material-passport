const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const keys = require("../config/keys");
const User = require("../models/User");

// facebook strategy
const facebookLogin = new FacebookStrategy(
  {
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookSecret,
    callbackURL: keys.facebookCallbackURL,
    profileFields: [
      "id",
      "email",
      "gender",
      "profileUrl",
      "displayName",
      "locale",
      "name",
      "timezone",
      "updated_time",
      "verified"
    ]
  },
  async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    try {
      const oldUser = await User.findOne({ facebookId: profile.id });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    // register user
    try {
      const newUser = await new User({
        provider: "facebook",
        facebookId: profile.id,
        facebookEmail: profile.emails[0].value,
        facebookDisplayName: profile.displayName,
        facebookProfileUrl: profile.profileUrl
      }).save();

      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

passport.use(facebookLogin);
