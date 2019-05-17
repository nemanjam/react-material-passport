const passport = require("passport");

const requireLocalAuth = passport.authenticate("local", {
  session: false,
  failureFlash: true
});

module.exports = requireLocalAuth;
