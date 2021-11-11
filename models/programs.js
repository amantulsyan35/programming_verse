const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = require('./review');
const User = require('./user');

const programSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
      fileName: String,
    },
  ],
  code: {
    type: String,
    required: true,
  },
  linesOfCode: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

programSchema.post('findOneAndDelete', async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Program', programSchema);
