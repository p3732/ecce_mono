const log  = require("./logging.js")("ecmono", 6);

/*
 * Starting function. Startup order is:
 * A-config
 *   load recursively from ./config directory
 * B-database
 *   connect and init db with sequelize
 * C-router
 *   set up routing with express and set pug to be used for rendering pages
 * D-server
 *   bind to localhost and start
 */
async function start() {
  var load_config = require("./config.js");
  var db     = require("./db.js");
  var router = require("./router.js");
  var server = require("./server.js");

  log("starting");
  const config = load_config("./config");
  modeWarning(config.mode);
  await db.init(config.db);

  await router.init(router, db, config.mode);
  try {
    server.start(config.server, router);
  } catch(err) {
    log.error("Server crashed. Error was: ", err);
  };
}

function modeWarning(mode) {
  if (mode !== "production") {
    const fence = "#".repeat(25);
    log(fence + " !!! Running in " + mode + " mode !!! " + fence);
  } else {
    log("Running in produciton mode.");
  }
}

module.exports = start;
