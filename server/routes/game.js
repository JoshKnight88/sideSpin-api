const express = require("express");

const gameRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

gameRoutes.route("/games").get((req, res) => {
  let db_connect = dbo.getDb("sideSpin");
  db_connect
    .collection("games")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

gameRoutes.route("/game/add").post((req, response) => {
  console.log({req})
  let db_connect = dbo.getDb();
  let myobj = {
    player1: req.body.player1,
    score1: req.body.score1,
    player2: req.body.player2,
    score2: req.body.score2,

  };
  db_connect.collection("games").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = gameRoutes;
