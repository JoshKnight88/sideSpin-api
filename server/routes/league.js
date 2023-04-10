const express = require('express');

const leagueRoutes = express.Router();

const dbo = require('../db/conn');

leagueRoutes.route('/leagues').get((req, res) => {
  let db_connect = dbo.getDb('sideSpin');
  db_connect
    .collection('leagues')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

leagueRoutes.route('/league/add').post((req, response) => {
  console.log('myobj');
  let db_connect = dbo.getDb();
  let myobj = {
    leagueName: req.body.leagueName,
    accessCode: req.body.accessCode,
    // playerId: req.body.playerId ? req.body.playerId : '',
    // gameId: req.body.gameId ? req.body.gameId : '',
  };

  db_connect.collection('leagues').insertOne(myobj, (err, res) => {
    if (err) throw err;
    console.log(err);
    response.json(res);
  });
});

leagueRoutes.route('/league/:id').get((req, res) => {
  let db_connect = dbo.getDb();
  let league = req.query.id;
  db_connect.collection('leagues').findOne(league, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = leagueRoutes;
