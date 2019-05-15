const passport = require("passport");

const requireLocalAuth = passport.authenticate("local", { session: false });

module.exports = requireLocalAuth;
