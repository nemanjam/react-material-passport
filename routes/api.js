const express = require("express");
const router = express.Router();

const requireJwtAuth = require("../middleware/requireJwtAuth");

router.get("/api/user", requireJwtAuth, (req, res) => {
  res.send({
    user: {
      displayName:
        req.user.firstName ||
        req.user.googleDisplayName ||
        req.user.facebookDisplayName
    }
  });
});

router.post("/api/feature", requireJwtAuth, (req, res) => {
  res.send({
    feature: "This is a feature. Only authenticated users can see this."
  });
});

router.post("/api/profile", requireJwtAuth, (req, res) => {
  res.send({
    profile: {
      provider: req.user.provider,
      displayName:
        req.user.firstName ||
        req.user.googleDisplayName ||
        req.user.facebookDisplayName,
      email: req.user.email || req.user.googleEmail || req.user.facebookEmail
    }
  });
});

module.exports = router;
