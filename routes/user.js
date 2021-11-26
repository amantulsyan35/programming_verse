const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/middleware');

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

//edit a user
router.put('/edit/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
  } catch (e) {
    next(e);
  }
});

//Delete a user
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
