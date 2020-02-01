var express = require('express');
var log     = require("../logging.js")("a/host", 6);

// globally available variables
var Level;

function getAPIDescription(req, res) {
  res.render("docs/host", {
    title: "Ecce Mono API Host"
  });
}

function getCurrentLevel(req, res) {
  log("requested current level")
  res.send(global_current_level);
}

function getAllSubmissions(req, res) {
  log("requested stored images")
  res.send(global_stored_images);
}

// default upon error is start random
startRandomEcceMono = startEcceMono;

function startEcceMono(req, res) {
  let id = req.params.id;
  if (!Number.isInteger(id) || id < 1 || id > global_amount_levels) {
    // set random level id
    id = Math.ceil(Math.random() * global_amount_levels)
  }
  log(id)

  // set global state
  global_state = "draw";

  // clear stored images
  global_stored_images = [];

  Level.findOne({
    where: {"id": id}
  })
  .then((level) => {
    // TODO only set specific fields
    log.debug(JSON.stringify(level));
    global_timeout = Date.now() + 1000 * level.timeout;
    level.timeout = global_timeout;
    global_current_level = level;
    res.send(global_current_level);
  });
}

module.exports = function(db) {
  var router = express.Router();
  Level = db.sequelize.models.Level;

  router.get("/", getAPIDescription);
  router.get("/current", getCurrentLevel);
  router.get("/gallery", getAllSubmissions);
  router.post("/start", startRandomEcceMono);
  router.post("/start/:id", startEcceMono);
  // TODO testing only, delete after
  router.get("/start_by_query", startRandomEcceMono);
  router.get("/start_by_query/:id", startEcceMono);

  return router;
}
