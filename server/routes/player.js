const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const playerRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// This section will help you get a list of all the records.
playerRoutes.route('/players').get((req, res) => {
  let db_connect = dbo.getDb('sideSpin');
  db_connect
    .collection('players')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
playerRoutes.route('/player/:id').get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('players').findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
playerRoutes.route('/player/add').post((req, response) => {
  console.log('myobj');

  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    ranking: 400,
    accessCode: req.body.accessCode,
  };
  db_connect.collection('players').insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
playerRoutes.route('/update/:id').post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      ranking: req.body.ranking,
    },
  };
  db_connect.collection('players').updateOne(myquery, newvalues, (err, res) => {
    if (err) throw err;
    console.log(`player ${req.body.name} has been updated`);
    response.json(res);
  });
});

// This section will help you delete a record
playerRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('players').deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});

//This section will help you find all players with the same access code

playerRoutes.route('/codes/:id').get((req, res) => {
  let db_connect = dbo.getDb();
  let leagueCode = req.params.id;
  db_connect
    .collection('players')
    .find({ accessCode: leagueCode })
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = playerRoutes;
