var express = require('express');
var log     = require("../logging.js")("a/clnt", 6);

// globally available variables
var Level;

function getAPIDescription(req, res) {
  res.render("docs/client", {
    title: "Ecce Mono API Client"
  });
}

function getCurrent(req, res) {
  log("request for current level");
  res.send(global_current_level);
}

function postImage(req, res) {
  // TODO check input
  try{
    // save in global state
    global_stored_images.push(req.body)
  } catch(error) {
    log("can't handle posted image")
  }
  res.redirect("/html/client/draw/draw.html")
}

function getAllLevels(req, res) {
  log("request for all levels");

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
  // Level = db.sequelize.models.Level;

  router.get("/", getAPIDescription);
  router.get("/current", getCurrent);
  router.post("/current", postImage);
  router.get("/level/all", getAllLevels);
  router.get("/level/:id", getLevel);

  return router;
}
