const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  username: String,
  password: String,
  songs: Array
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;