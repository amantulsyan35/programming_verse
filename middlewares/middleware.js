const Program = require('../models/programs');
const Review = require('../models/review');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send('Error You Must Be Signed In');
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const program = await Program.findById(id);
  if (!program.author.equals(req.user._id)) {
    res.send('You donot have permission to do that');
  }
  next();
};
module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    res.send('You donot have permission to do that');
  }
  next();
};
