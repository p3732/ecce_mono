var express = require('express');

function getClientPage(req, res) {
  res.render("client_page", {
    title: "Ecce Mono"
  });
}

function getHostPage(req, res) {
  res.render("host_page", {
    title: "Ecce Mono"
  });
}

module.exports = function(db) {
  var router = express.Router();

  router.get('/', getClientPage);
  router.get('/host', getHostPage);

  return router;
}
