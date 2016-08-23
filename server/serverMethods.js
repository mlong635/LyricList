const Test = require('../db/testSchema');

module.exports.createNewTest = (newTestObj) => {
  console.log("create New test invoked with newTest OBj", newTestObj);
  return new Promise ((resolve, reject) => {
    Test.find({ name: newTestObj.test.name}, (err, tests) => {
      if(err){
        console.log("createNewTest error ", err);
      }
      console.log("test results", tests);
      if(tests.length===0){
        newTestObj.test.save((err, resp) => {
          if(err){
            console.log("createNewTest database error ", err);
            reject(err);
          }
          else {
            console.log("resolving resp", resp)
            resolve(resp);
          }
        });
        console.log(`${newTestObj.test.name} test created`);
      }
      else {
        Test.findOneAndUpdate(
          { name: newTestObj.test.name},
          { $set: {
            addressNumber: newTestObj.test.addressNumber,
            addressStreet: newTestObj.test.addressStreet,
            state: newTestObj.test.state,
            zip: newTestObj.test.zip,
          } }, { upsert: true },
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(`${newTestObj.test.name} test updated`);
      }
    })
  });
}