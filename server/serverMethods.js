// const Song = require('../db/songSchema');
// const User = require('../db/userSchema');
const UserProfile = require('../db/userProfileSchema');


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
    songInfo.newSong.dateCreated = formatDate();
    songInfo.newSong.lastUpdated = songInfo.newSong.dateCreated;
    console.log("*****songInfo.newSong", songInfo.newSong);
    allUserSongs.push(songInfo.newSong);
    // console.log("^^^^^^^^^^^^^^^^^^allUserSongs", allUserSongs)
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

module.exports.updateSong = (songInfo) => {
  console.log("updateSong invoked with  Obj", songInfo);
  return new Promise ((resolve, reject) => {
    let _id = songInfo.userProfile._id;
    let allUserSongs = songInfo.userProfile.songs;
    songInfo.newSong.lastUpdated = formatDate();
    allUserSongs.push(songInfo.newSong);
    console.log("^^^^^^^^^^^^^^^^^^allUserSongs", allUserSongs)
    UserProfile.findOneAndUpdate(
      { _id: _id },
      { $set: {
        songs: allUserSongs
      } }, { upsert: true },
      (err, resp) => {return err ? reject(err) : resolve(resp); }
    );
    console.log(`${songInfo.newSong.title} added to ${songInfo.userProfile.username}s userProfile`);
  });
};

function formatDate () {
  var now = new Date(Date.now());
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var year = now.getFullYear().toString().substring(2,4);
  var formattedDate = month + '/' + day + '/' + year;
  return formattedDate;
}

