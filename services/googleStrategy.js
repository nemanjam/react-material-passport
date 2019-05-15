const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const keys = require("../config/keys");
const User = require("../models/User");

// google strategy
const googleLogin = new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.googleCallbackURL,
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    try {
      const oldUser = await User.findOne({ googleId: profile.id });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const newUser = await new User({
        provider: "google",
        googleId: profile.id,
        googleEmail: profile.email,
        googleDisplayName: profile.displayName,
        googlePicture: profile.picture
      }).save();
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

passport.use(googleLogin);
