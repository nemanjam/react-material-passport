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
  res.send({ feature: "This is a feature." });
});

module.exports = router;
