var express = require('express');
var log     = require("../logging.js")("api/", 6);

// globally available variables
var Level;

function getAPIDescription(req, res) {
  res.render("docs/host", {
    title: "Ecce Mono API Host"
  })
}

function getCurrentSubmissions(req, res) {
  res.end();
}

function startNewEcceMono(req, res) {
  res.end();
}

module.exports = function(db) {
  var router = express.Router();
  Level = db.sequelize.models.Level;

  router.get("/", getAPIDescription);
  router.get("/current", getCurrentSubmissions);
  router.post("/start", startNewEcceMono);

  return router;
}
