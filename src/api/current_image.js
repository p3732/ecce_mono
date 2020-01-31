var express = require('express');
var log     = require("../logging.js")("api/quittung");

// globally available variables
var Level;

function getLevel(req, res) {
  res.redirect("back");
}

function postImage(req, res) {
  let r = req.body

  log(JSON.stringify(r));

  // check input for correctness
  if (!check_request(r)) {
    log("Not fulfilling request with incorrect provided values.")
    log(JSON.stringify(r))
    // TODO send to error page
    res.redirect("back");
    return;
  }

  res.redirect("back")
}

function check_request(r) {
  return true;
}

module.exports = function(db) {
  var router = express.Router();
  Level = db.sequelize.models.Level;

  router.get("/", getLevel)
  router.post("/", postImage);

  return router;
}
