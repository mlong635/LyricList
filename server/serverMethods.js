const Song = require('../db/songSchema');
const User = require('../db/userSchema');
const UserProfile = require('../db/UserProfileSchema');


module.exports.createUserProfile = (newUserObj) => {
  return new Promise ((resolve, reject) => {
    UserProfile.find({ username: newUserObj.user.username }, (err, users) => {
      if(err){
        console.log("createNewUser error ", err);
      }
      if(users.length===0){
        newUserObj.user.save((err, resp) => {
          if(err){
            console.log("createNewUser database error", err);
            reject(err);
          }
          else {
            console.log("resolving createNewUser response ", resp);
            resolve(resp);
          }
        })
      }
      else {
        console.log("username already taken");
        newUserObj.alreadyTaken = true;
        resolve(newUserObj);
      }
    })
  });
};

module.exports.createNewUser = (newUserObj) => {
  return new Promise ((resolve, reject) => {
    User.find({ username: newUserObj.user.username }, (err, users) => {
      if(err){
        console.log("createNewUser error ", err);
      }
      if(users.length===0){
        newUserObj.user.save((err, resp) => {
          if(err){
            console.log("createNewUser database error", err);
            reject(err);
          }
          else {
            console.log("resolving createNewUser response ", resp);
            resolve(resp);
          }
        })
      }
      else {
        console.log("username already taken");
        newUserObj.alreadyTaken = true;
        resolve(newUserObj);
      }
    })
  });
};

module.exports.createNewSong = (newSongObj) => {
  console.log("create New song invoked with newsong OBj", newSongObj);
  return new Promise ((resolve, reject) => {
    Song.find({ name: newSongObj.song.title}, (err, songs) => {
      if(err){
        console.log("createNewSong error ", err);
      }
      if(songs.length===0){
        newSongObj.song.save((err, resp) => {
          if(err){
            console.log("createNewSong database error ", err);
            reject(err);
          }
          else {
            console.log("resolving resp", resp)
            resolve(resp);
          }
        });
        console.log(`${newSongObj.song.title} song created`);
      }
      else {
        Song.findOneAndUpdate(
          { name: newSongObj.song.title},
          { $set: {
            notes: newSongObj.song.notes,
            lyrics: newSongObj.song.lyrics,
          } }, { upsert: true },
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(`${newSongObj.song.title} song updated`);
      }
    })
  });
};