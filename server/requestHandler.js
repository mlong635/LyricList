'use strict';

const db = require('../db/dbConfig');
const mongoose = require('mongoose');
const Song = require('../db/songSchema');
const User = require('../db/userSchema');
const UserProfile = require('../db/userProfileSchema');
let savedUserProfile = () => 'No saved user';

const { createNewSong, createNewUser, createUserProfile } = require('./serverMethods');

module.exports = (app) => {

  app.post('/database/saveUserProfile', (req, res) => {
    console.log('&&&&&&&&&& requestHandler database/saveUserProfile req.body', req.body);
    
    let closure = function (userProfile) {
      return function () {
        return userProfile;
      }
    }
    console.log("$$$$$ Object.keys(req.body).length", Object.keys(req.body).length);
    if (Object.keys(req.body).length){  // if req.body is not an empty object
      savedUserProfile = closure(req.body);
      res.status(200).send("userProfile saved in server");
    }
    else {
      console.log("savedUserProfile", savedUserProfile);
      res.status(200).send(savedUserProfile());
    }
  });

  app.post('/database/createUserProfile', (req, res) => {
    console.log('************* requestHandler database/createUserProfile req.body', req.body);
    let newUserObj = {};
    newUserObj.user = new UserProfile ({
      username : req.body.username,
      password : req.body.password
    });
    createUserProfile(newUserObj)
    .then( (newUserObj) => {
      if(newUserObj.alreadyTaken){
        res.status(400).send('Username already taken');
      }
      else {
        res.status(200).send(newUserObj);
      }
    })
    .catch( (err) => {
      console.log("requestHandler /database/createUserProfile error", err);
      res.status(400).send(err)
    })
  });

  app.post('/database/fetchUserProfile', (req, res) => {
    // console.log('************* requestHandler database/fetchUserProfile req.body', req);
    let _id = req.headers.referer.split('/').pop();
    UserProfile.findOne({ _id }, (err, user) => {
      console.log("database/fetchUserProfile responded with ", user);
      if(err){
        console.log("requestHandler database/fetchUserProfile error ", err)
      }
      else {
        res.status(200).send(user);
      }
    })
  });

  app.post('/database/submitLogin', (req, res) => {
    console.log('************* requestHandler database/submitLogin req.body', req.body);
    let username = req.body.username;
    UserProfile.findOne({ username }, (err, user) =>{
      console.log("database/submitLogin responded with ", user);
      if(user===null){
        console.log("Invalid Username");
        res.status(200).send("Invalid Username");
      }
      else if(req.body.password!==user.password){
        console.log("Invalid password");
        res.status(200).send("Invalid Password")
      }
      else {
        res.status(200).send(user);
      }
    })
  });

  app.post('/database/createAccount', (req, res) => {
    console.log('************* requestHandler database/createAccount req.body', req.body);
    let newUserObj = {};
    newUserObj.user = new User ({
      username : req.body.username,
      password : req.body.password
    });
    createNewUser(newUserObj)
    .then( (newUserObj) => {
      if(newUserObj.alreadyTaken){
        res.status(400).send(err);
      }
      else {
        res.status(200).send(newUserObj);
      }
    })
    .catch( (err) => {
      console.log("requestHandler /database/createAccount error", err);
      res.status(400).send(err)
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
    let songInfo = req.body;
    createNewSong(songInfo)
    .then((newSongObj) => {
      console.log("createNewSong responded with ", newSongObj)
      res.status(200).send(newSongObj);
    })
    .catch( (err) => {
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