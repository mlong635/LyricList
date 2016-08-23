'use strict';

const db = require('../db/dbConfig');
const mongoose = require('mongoose');
const Test = require('../db/testSchema');
const { createNewTest } = require('./serverMethods');

let newTestObj = {};
newTestObj.test = new Test({
  name: 'Matt',
  addressNumber: 4,
  addressStreet: '17th Street',
  state: 'CA',
  zip: 94110,
});

createNewTest(newTestObj)
.then((newTestObj) => {
  console.log("newTestObj written to the db (i think)", newTestObj);
  return newTestObj;
})
.catch(err => {
  console.log("requestHandler error", err);
  res.status(400).send(err)
});;



module.exports = app => {
  app.get('/database/allTests', (req, res) => {
    Test.find((err, tests) => {
      console.log("requestHandler just received", tests);
      res.status(200).send(tests);
    });
  });
};