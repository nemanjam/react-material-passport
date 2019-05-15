// prod.js - production keys
module.exports = {
  mongoURI: process.env.MONGO_URI,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALBACK_URL,
  facebookAppID: process.env.FACEBOOK_APP_ID,
  facebookSecret: process.env.FACEBOOK_SECRET,
  facebookCallbackURL: process.env.FACEBOOK_CALLBACK_URL,
  successRedirectURL: process.env.SUCCESS_REDIRECT_URL,
  secretOrKey: "secret"
};
