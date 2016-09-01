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

module.exports.createNewSong = (songInfo) => {
  console.log("create New song invoked with newsong OBj", songInfo);
  return new Promise ((resolve, reject) => {
    let _id = songInfo.userProfile._id;
    let allUserSongs = songInfo.userProfile.songs;
    allUserSongs.push(songInfo.newSong);
    console.log("^^^^^^^^^^^^^^^^^^allUserSongs", allUserSongs)
    UserProfile.findOneAndUpdate(
      { _id: _id },
      { $set: {
        songs: allUserSongs,
      } }, { upsert: true },
      (err, resp) => {return err ? reject(err) : resolve(resp); }
    );
    console.log(`${songInfo.newSong.title} added to ${songInfo.userProfile.username}s userProfile`);
  });
};

