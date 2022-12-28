const express = require('express');

const gameRoutes = express.Router();

const dbo = require('../db/conn');

gameRoutes.route('/games').get((req, res) => {
  let db_connect = dbo.getDb('sideSpin');
  db_connect
    .collection('games')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

gameRoutes.route('/game/add').post((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = {
    playerOne: req.body.playerOne,
    scoreOne: req.body.scoreOne,
    playerTwo: req.body.playerTwo,
    scoreTwo: req.body.scoreTwo,
  };
  db_connect.collection('games').insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = gameRoutes;
