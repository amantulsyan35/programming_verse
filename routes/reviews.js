const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor } = require('../middlewares/middleware');

//Database models
const Program = require('../models/programs');
const Review = require('../models/review');

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id);
    const review = new Review(req.body);
    review.author = req.user._id;
    program.reviews.push(review);
    await review.save();
    await program.save();
  } catch (e) {
    next(e);
  }
});

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  async (req, res, next) => {
    try {
      const { id, reviewId } = req.params;
      await Program.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
