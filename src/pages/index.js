var express = require('express');

function getClientPage(req, res) {
  if (global_state == "draw") {
    res.redirect("/html/client/draw.html");
  } else if (global_state == "vote") {
    res.redirect("/html/client/vote.html");
  } else {
    res.redirect("/html/client/init.html");
  }
}

function getHostPage(req, res) {
  if (global_state == "draw") {
    res.redirect("/html/host/draw.html");
  } else if (global_state == "vote") {
    res.redirect("/html/host/vote.html");
  } else {
    res.redirect("/html/host/init.html");
  }
}

module.exports = function(db) {
  var router = express.Router();

  router.get('/', getClientPage);
  router.get('/host', getHostPage);

  return router;
}
