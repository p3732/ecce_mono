const express = require('express');
const ip    = require("ip");

function getCurrentIP(req, res) {
  let address = "" + global_ip;
  if (global_port != 80) {
    address = address + ":" + global_port;
  }
  res.send(address);
}

module.exports = function(db) {
  var router = express.Router();

  router.get("/", getCurrentIP);

  return router;
}
