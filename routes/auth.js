const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user');

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.send(registeredUser);
    });
  } catch (e) {
    next(e);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('you logged in');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

router.get('/currentuser', (req, res) => {
  res.send(req.user);
});

module.exports = router;
