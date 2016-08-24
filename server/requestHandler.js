'use strict';

const db = require('../db/dbConfig');
const mongoose = require('mongoose');
const Song = require('../db/songSchema');
const { createNewSong } = require('./serverMethods');







module.exports = app => {
  app.get('/database/allSongs', (req, res) => {
    Song.find((err, songs) => {
      console.log("database/allSongs requestHandler just received", songs);
      res.status(200).send(songs);
    });
  });
  app.post('/database/createSong', (req, res) =>{
    console.log("request handler database/createSong just rec'd ", req.body); 
    // re.body looks like this --> { title: 'asdfasdf', notes: 'asdfasdf', lyrics: 'asdfasdfsa' }
    let newSongObj = {};
    newSongObj.song = new Song({
      title: req.body.title,
      notes: req.body.notes,
      lyrics: req.body.lyrics
    });
    createNewSong(newSongObj)
    .then((newSongObj) => {
      console.log("newSongObj written to the db", newSongObj);
      return newSongObj;
    })
    .catch(err => {
      console.log("requestHandler /database/createSong error", err);
      res.status(400).send(err)
    });
  });
};