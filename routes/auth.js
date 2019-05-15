const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/User");
const requireLocalAuth = require("../middleware/requireLocalAuth");

tokenFromUser = user => {
  const token = jwt.sign({}, keys.secretOrKey, {
    expiresIn: "12h",
    subject: user.id
  });
  return token;
};

// facebook auth
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);

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
    res.redirect(keys.googleRedirectURL);
  }
);

//local login
router.post("/auth/login", requireLocalAuth, (req, res) => {
  const token = tokenFromUser(req.user);
  res.cookie("x-auth-cookie", token);
  res.redirect(keys.successRedirectURL);
});

router.post("/auth/register", (req, res, next) => {
  const { email, password } = req.body;
  //console.log(req.body);
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({
      provider: "email",
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      const token = tokenFromUser(user);
      console.log(token);
      res.cookie("x-auth-cookie", token);
      res.redirect(keys.successRedirectURL);
    });
  });
});

// logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.send(false);
});

module.exports = router;
