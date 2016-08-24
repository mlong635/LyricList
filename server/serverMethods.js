const Song = require('../db/songSchema');

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
}