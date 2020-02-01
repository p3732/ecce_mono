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
  try{
    let imgage_data = req.body.imgData;
    // check input
    if (imgage_data && imgage_data.startsWith("data:image/png")) {
      log("received image data");
      // save in global state
      global_stored_images.push(imgage_data);
      global_votes.push(0)
    }
  } catch(error) {
    log("can't handle posted image");
  }
  res.redirect("/html/client/draw.html");
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

function getSubmissionAmount(req, res) {
  res.send(global_stored_images.length)
}

function voteForSubmission(req, res) {
  // check that this id can actually be voted for
  /*global_state == "vote" &&*/
  if ( Number.isInteger(id) && id > 0
      && id <= global_votes.length) {
    global_votes[req.params.id-1] += 1;
  }
  res.end();
}

module.exports = function(db) {
  var router = express.Router();
  Level = db.sequelize.models.Level;

  router.get("/", getAPIDescription);
  router.get("/current", getCurrent);
  router.post("/current", postImage);
  router.get("/level/:id", getLevel);
  router.get("/vote", getSubmissionAmount);
  router.post("/vote/:id", voteForSubmission);

  return router;
}
