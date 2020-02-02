var express = require('express');
var log     = require("../logging.js")("a/host", 6);

// globally available variables
var Level;

function getAPIDescription(req, res) {
  res.render("docs/host", {
    title: "Ecce Mono API Host"
  });
}

function getAllLevels(req, res) {
  log("request for all levels");

  Level.findAll()
  .then((data) => {
    res.send(data);
  });
}

function getCurrentLevel(req, res) {
  log("requested current level");
  res.send(global_current_level);
}

function getAllSubmissions(req, res) {
  log("requested stored images");
  res.send(global_stored_images);
}
// default upon error is start random
startRandomizedGame = startGame;

function startGame(req, res) {
  // if (global_state == "draw") {
  //   log.warn("tried to start new game, but not in init state");
  //   res.end();
  // } else {
  let id = req.params.id;
  if (!Number.isInteger(id) || id < 1 || id > global_amount_levels) {
    // set random level id
    id = Math.ceil(Math.random() * global_amount_levels)
  }
  log("starting new level (id " + id + ")");

  // set global state
  log("starting new level in state " + global_state)
  global_state = "draw";

  // clear stored images
  global_stored_images = [];
  global_votes = [];

  log("images now are " + global_stored_images)
  log("votes now are " + global_votes)

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
  // TODO wait for timeout to be done, then switch to vote state
}

function getVotes(req, res) {
  if (true) {//TODO global_state == "vote"){
    res.send(global_votes);
  } else {
    log.warn("requested votes, but not in voting state");
    res.end();
  }
}

module.exports = function(db) {
  var router = express.Router();
  Level = db.sequelize.models.Level;

  router.get("/", getAPIDescription);
  router.get("/all_levels", getAllLevels);
  router.get("/current", getCurrentLevel);
  router.get("/gallery", getAllSubmissions);
  router.post("/start", startRandomizedGame);
  router.post("/start/:id", startGame);
  // TODO testing only, delete after
  router.get("/start_by_query", startRandomizedGame);
  router.get("/start_by_query/:id", startGame);
  router.get("/votes", getVotes);

  return router;
}
