const express = require('express');

const playerRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

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

playerRoutes.route('/player/:id').get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('players').findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

playerRoutes.route('/player/add').post((req, response) => {
  console.log('myobj');

  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    ranking: 400,
    accessCode: req.body.accessCode,
    leagueName: req.body.leagueName,
  };
  db_connect.collection('players').insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

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

playerRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('players').deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});

playerRoutes.route('/codes/:id').get((req, res) => {
  let db_connect = dbo.getDb('sideSpin');
  let leagueCode = req.params.id;
  db_connect
    .collection('players')
    .aggregate([
      {
        $match: {
          accessCode: leagueCode,
        },
      },
    ])
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

playerRoutes.route('/players/default').get((req, res) => {
  let db_connect = dbo.getDb('sideSpin');
  db_connect
    .collection('players')
    .aggregate([
      {
        $match: {
          accessCode: '',
        },
      },
    ])
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = playerRoutes;
