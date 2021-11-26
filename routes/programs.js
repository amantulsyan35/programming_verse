const express = require('express');
require('dotenv').config();
const router = express.Router();
const { isLoggedIn, isAuthor } = require('../middlewares/middleware');
// const cloudinary = require('cloudinary').v2;

const Program = require('../models/programs');
const User = require('../models/user');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

router.get('/', async (req, res, next) => {
  try {
    const programs = await Program.find({});
    res.send(programs);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const program = new Program(req.body);
    const user = await User.findById(req.user._id);
    program.author = req.user._id;
    user.programs.push(program);
    // Promise.all
    await program.save();
    await user.save();
  } catch (e) {
    next(e);
  }
});

router.put('/:id/edit', isLoggedIn, isAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    // const program = await Program.findById(id);
    // if (program.images) {
    //   for (let filename of program.images) {
    //     await cloudinary.uploader.destroy(
    //       filename.public_id,
    //       (err, result) => {}
    //     );
    //   }
    // }
    await Program.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', isLoggedIn, isAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id);
    await Program.findByIdAndDelete(id);
    // if (program.images) {
    //   for (let filename of program.images) {
    //     console.log(filename.public_id);
    //     await cloudinary.uploader.destroy(filename.public_id, (err, result) => {
    //       console.log(err);
    //       console.log(result);
    //     });
    //   }
    // }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
