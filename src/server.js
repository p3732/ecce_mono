const http = require('http');
const ip = require("ip");
const log  = require("./logging.js")("server", 6);

/** Starts the server and binds it to the port. */
this.start = function(server_config, router) {
  //Create HTTP server.
  var port = server_config.port;
  router.set("port", port);
  var server = http.createServer(router);

  log("starting");
  let address = ip.address();
  server.listen(port, address);

  server.on("listening", function onListening() {
    var host = server.address().address
    host = (host == "::") ? "localhost" : host;
    log("listening at " + host + ':' + port);
  });
  server.on("error", function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = (typeof port === "string" ? "Pipe " : "Port ") + port;

    // handle specific listen errors
    switch (error.code) {
      case "EACCES":
        log.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        log.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
}

module.exports = this;
