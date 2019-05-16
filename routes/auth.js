const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

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
    res.redirect(keys.successRedirectURL);
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
    res.redirect(keys.successRedirectURL);
  }
);

//local login
router.post("/auth/login", requireLocalAuth, (req, res) => {
  const token = tokenFromUser(req.user);
  res.cookie("x-auth-cookie", token);
  res.redirect(keys.successRedirectURL);
});

router.post("/auth/register", async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required()
  });

  let form;
  try {
    form = await Joi.validate(req.body, schema);
  } catch (err) {
    return res.status(422).send(err.details[0].message);
  }
  const { email, password } = form;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    try {
      const user = await new User({
        provider: "email",
        email: email,
        password: password
      }).save();
      const token = tokenFromUser(user);
      console.log(token);
      res.cookie("x-auth-cookie", token);
      res.redirect(keys.successRedirectURL);
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

// logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.send(false);
});

module.exports = router;
