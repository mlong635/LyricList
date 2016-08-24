const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  notes: String,
  lyrics: String,
});

const Song = mongoose.model('UserSong', songSchema);

module.exports = Song;