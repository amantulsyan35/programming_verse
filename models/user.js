const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    // required: true,
  },
  profilePicture: {
    type: String,
    // required: true,
  },
  gitHubLink: {
    type: String,
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
