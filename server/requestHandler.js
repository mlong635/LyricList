'use strict';

const db = require('../db/dbConfig');
const mongoose = require('mongoose');
const Song = require('../db/songSchema');
const User = require('../db/userSchema');
const UserProfile = require('../db/userProfileSchema');
const nodemailer = require('nodemailer');
let savedUserProfile = () => 'No saved user';
let secretKeys = null;
if (!process.env.NODEMAILER_URI) {
  secretKeys = require('../env/config');
}

const { createNewSong, createNewUser, createUserProfile } = require('./serverMethods');

module.exports = (app) => {

  app.post('/server/sendEmail', (req, res) => {
    return new Promise ((resolve, reject) => {
      let emailPassword = process.env.NODEMAILER_URI ? process.env.NODEMAILER_URI : secretKeys.NODEMAILER_URI;

      // create reusable transporter object using the default SMTP transport      
      let transporter = nodemailer.createTransport(emailPassword);

      // emailInfo = {sender: this.state.userProfile.username, email: targetEmail, body: this.state.thisSong.lyrics};

      var mailOptions = {
          from: '"LyricList Support" <LyricListService@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: req.body.sender + ' sent you a song from LyricList', // Subject line
          // text: req.body.body, // plaintext body
          html: req.body.body // html body
      };
      let targetEmail = req.body.body

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log("nodeMailer transporter.sendMail() error", error);
          }
          res.status(200).send(targetEmail);
          resolve(targetEmail);
      });
    });

  })

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

  app.post('/database/deleteSong', (req, res) => {
    return new Promise ((resolve, reject) => {
      let userProfile = req.body.userProfile;
      let deleteSong = req.body.deleteSong;
      console.log('reqHandler /database/deletesong about to delete ', deleteSong, ' from ', userProfile);
      let allSongs = userProfile.songs.slice();
      for(let i=0; i<allSongs.length; i++){
        if(allSongs[i].title===deleteSong){
          allSongs.splice(i, 1);
          break;
        }
      }
      UserProfile.findOneAndUpdate(
        { _id: userProfile._id },
        { $set: {
          songs: allSongs,
        } }, { upsert: true },
        (err, resp) => {return err ? reject(err) : resolve(resp); }
      );
      console.log(`${deleteSong} removed from ${userProfile.username}s userProfile`);
    })
  });
};