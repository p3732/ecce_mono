structure
=========
  This file tries to give an overview of the project's structure.

config_example / config
-----------------------
  Contains configuration files to setup and tweak __ecce_mono__ to a user's needs.
  All files are in .hjson format ([hjson.org](hjson.org)). See main README for
  usage.

src
---
  Contains source code files and is neither intended, nor required to be
  modified by users. It contains:

  * api - Routing information for the REST API, processed by router.js.
  * models - Information for the database models, processed by db.js.
  * pages - Frontend pages. Their routes are given by folder paths. (router.js)
  * static - Static content, such as images, media and css files.
  * views - Site skeletons for the frontend, written in pug. Parsed dynamically.
  * .js files
    - config.js
      * Handles reading of all configs in the config folder.
    - db.js
      * Sets up the database connection by setting up a `sequelize` (ORM)
        instance.
      * Recursively creates models from the models folder.
      * Creates default values given from config.
    - logging.js
      * Simple logger, offers prompt (passed as parameter), indenting, as well
        as debug and error levels.
    - router.js
      * Configures `express`, a module used for routing. Sets up routes for the
        API, dynamic pages, static content, favicon and 404 sites.
    - server.js
      * Starts the server, using the bindings set up by router.js.
    - ecce_mono.js
      * Starting point that calls the other .js files in order.
      
init.js
-------
Starts __ecce_mono__. Start with `node init`.
