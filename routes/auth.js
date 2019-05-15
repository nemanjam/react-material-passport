const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

// facebook auth
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);

tokenFromUser = user => {
  const token = jwt.sign({}, keys.secretOrKey, {
    expiresIn: "12h",
    subject: user.id
  });
  return token;
};

router.get(
  keys.facebookCallbackURL,
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    const token = tokenFromUser(req.user);
    res.cookie("x-auth-cookie", token);
    res.redirect(keys.facebookRedirectURL);
  }
);

// google auth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  keys.googleCallbackURL,
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    const token = tokenFromUser(req.user);
    res.cookie("x-auth-cookie", token);
    // console.log(token);
    // console.log(keys.googleRedirectURL);
    res.redirect(keys.googleRedirectURL);
  }
);

// logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.send(false);
});

module.exports = router;
