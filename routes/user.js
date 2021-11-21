const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthor } = require('../middlewares/middleware');

const User = require('../models/user');

//get a user by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('programs');
    res.send(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
