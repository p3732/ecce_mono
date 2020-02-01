var express = require('express');
var log     = require("../logging.js")("pages/", 6);

function getClientPage(req, res) {
  if (global_state == "init") {
    res.redirect("/html/client/wait.html");
  } else if (global_state == "draw") {
    res.redirect("/html/client/draw.html");
  } else if (global_state == "vote") {
    res.redirect("/html/client/vote.html");
  } else {
    log.error("undefined state");
  }
}

function getHostPage(req, res) {
  if (global_state == "init") {
    res.redirect("/html/host/start.html");
  } else if (global_state == "draw") {
    res.redirect("/html/host/draw.html");
  } else if (global_state == "vote") {
    res.redirect("/html/host/gallery.html");
  } else {
    log.error("undefined state");
  }
}

module.exports = function(db) {
  var router = express.Router();

  router.get('/', getClientPage);
  router.get('/host', getHostPage);

  return router;
}
