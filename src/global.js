const log  = require("./logging.js")("global", 6);

/** Sets global variables. */
module.exports = async function(db) {
  let Level = db.sequelize.models.Level;
  global.global_amount_levels = await Level.count();
  log("there are " + global_amount_levels + " known levels");

  global.global_current_level = null;
  // states are: init, ready, draw, vote
  global.global_state = "init";
  global.global_stored_images = [];
  global.global_timeout = null;
  global.global_votes = [];

  log("initialized global variables");
};
