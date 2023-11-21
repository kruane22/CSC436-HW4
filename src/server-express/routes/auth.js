const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`;
const saltRounds = 10;

router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    res.status(400).json({ error: "Passwords not matching" });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token, username: user.username });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

module.exports = router;