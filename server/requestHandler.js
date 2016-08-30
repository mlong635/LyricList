'use strict';

const db = require('../db/dbConfig');
const mongoose = require('mongoose');
const Song = require('../db/songSchema');
const User = require('../db/userSchema');
const { createNewSong } = require('./serverMethods');

module.exports = app => {
  app.post('/database/submitLogin', (req, res) => {
    console.log('************* requestHandler database/submitLogin req.body', req.body);
    let username = req.body.username;
    User.findOne({ username }, (err, user) =>{
      console.log(arguments);
    })
  });

  app.get('/database/allSongs', (req, res) => {
    Song.find((err, songs) => {
      console.log("database/allSongs requestHandler just received", songs);
      res.status(200).send(songs);
    });
  });
  app.post('/database/createSong', (req, res) =>{
    console.log("request handler database/createSong just rec'd ", req.body); 
    // req.body looks like this --> { title: 'asdfasdf', notes: 'asdfasdf', lyrics: 'asdfasdfsa' }
    let newSongObj = {};
    newSongObj.song = new Song({
      title: req.body.title,
      notes: req.body.notes,
      lyrics: req.body.lyrics
    });
    createNewSong(newSongObj)
    .then((newSongObj) => {
      res.status(200).send(newSongObj);
    })
    .catch(err => {
      console.log("requestHandler /database/createSong error", err);
      res.status(400).send(err)
    });
  });
  app.get('/database/fetchOneSong', (req, res) => {
    let _id = req.headers.referer.split('/').pop();
    console.log("requestHandler database/fetchOneSong id $$$$$$", _id);
    Song.findOne({ _id }, (err, song) => {
      console.log("request handler received song from db and about to send to client", song)
      res.status(200).send(song)
    })
  });

  app.get('/database/editSong', (req, res) => {
    return new Promise ((resolve, reject) => {
      let _id = req.headers.referer.split('/').pop();
      console.log("requestHandler database/editSong id $$$$$$", _id);
      Song.findOne({ _id }, (err, song) => {
        res.status(200).send(song);
        resolve(song);
      })
    })
  })

  app.get('/database/deleteSong', (req, res) => {
    return new Promise ((resolve, reject) => {
      let _id = req.headers.referer.split('/').pop();
      console.log("requestHandler /database/deleteSong *******", _id);
      Song.findOne({ _id }).remove().exec();
      res.status(200).send('response');
      resolve('song deleted');
    })
  });
};