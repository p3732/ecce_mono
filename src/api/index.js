var express = require('express');
var log     = require("../logging.js")("api/", 6);

// globally available variables
var Level;

function getAPIDescription(req, res) {
  res.render("docs/client", {
    title: "Ecce Mono API Client"
  })
}

function getCurrent(req, res) {
  //TODO read from global state
  res.redirect("/");
}

function postImage(req, res) {
  //TODO check input
  //TODO store image to some cache
  //TODO save in global state
  res.redirect("/")
}

function getAllLevels(req, res) {
  Level.findAll()
  .then((data) => {
    res.send(data);
  });
}

function getLevel(req, res) {
  log("request for level " + req.params.id);

  Level.findOne({
    where: req.params
  })
  .then((data) => {
    res.send(data);
  });
}

module.exports = function(db) {
  var router = express.Router();
  Level = db.sequelize.models.Level;

  router.get("/", getAPIDescription);
  router.get("/current", getCurrent);
  router.post("/current", postImage);
  router.get("/level/all", getAllLevels);
  router.get("/level/:id", getLevel);

  return router;
}
