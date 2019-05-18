const passport = require("passport");

const requireLocalAuth1 = passport.authenticate("local", {
  session: false,
  failureFlash: true
});

const requireLocalAuth = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send(info);
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = requireLocalAuth;
