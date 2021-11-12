const express = require('express');
const router = express.Router();
const Program = require('../models/programs');
const { isLoggedIn, isAuthor } = require('../middlewares/middleware');

router.get('/', async (req, res) => {
  const programs = await Program.find({});
  res.send(programs);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const program = await Program.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('author');
  res.send(program);
});

router.post('/', isLoggedIn, async (req, res) => {
  const program = new Program(req.body);
  program.author = req.user._id;
  await program.save();
});

router.put('/:id/edit', isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  await Program.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
});

router.delete('/:id', isLoggedIn, isAuthor, async (req, res) => {
  try {
    const { id } = req.params;
    await Program.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
