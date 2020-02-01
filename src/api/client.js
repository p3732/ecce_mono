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
  if (global_state == "draw") {
    res.send(global_current_level);
  } else {
    res.end();
  }
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
  //TODO res.redirect("/html/client/vote.html");
  res.end();
}

function getLevel(req, res) {
  let id = Number.parseInt(req.params.id, 10);
  if (Number.isInteger(id)) {
    log("request for level " + id);
    Level.findOne({
      where: {"id": id}
    })
    .then((data) => {
      res.send(data);
    });
  } else {
    log("request for invalid level " + req.params.id);
    res.end();
  }
}

function getSubmissionAmount(req, res) {
  res.send(global_stored_images.length)
}

function voteForSubmission(req, res) {
  let id = Number.parseInt(req.params.id, 10);

  if (Number.isInteger(id) && id >= 0 && id < global_votes.length) {
    log("voted for "+ id);
    global_votes[id] += 1;
    log(id + " now has " + global_votes[id] + " votes");
  } else {
    log.warn("incorrect voting attempted ")
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
