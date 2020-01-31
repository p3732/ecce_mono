const fs        = require('fs');
const log       = require("./logging.js")("db", 6);
const path      = require('path');
const Sequelize = require('sequelize');

/** Connect to DB. Returns Promise.*/
async function connect(sequelize) {
  try {
    log("connecting to db");
    await sequelize.authenticate();
    log("connection has been established successfully");
  } catch (err) {
    log.error("Unable to connect to the database: ", err);
    //TODO throw
  }
}

/** Load models. Asynchronous.*/
async function loadModels(db) {
  try {
      log("loading models");
      var folder = path.join(__dirname, "models");
      loadModelsRecursive(folder, db);
      log("loaded models")
  } catch(err) {
    log.error('An error occurred while loading the models:', err);
    //TODO throw
  }
}

/** Loads models recursively from given @param folder and adds them to the @param db. */
function loadModelsRecursive(folder, db) {
  log.indent();
  for (const file of fs.readdirSync(folder)) {
    var currentFile = path.join(folder, file);

    if (fs.lstatSync(currentFile).isDirectory()) {
      log("entering " + file);
      loadModelsRecursive(currentFile, db);
    } else if (file.endsWith('.js') && file.toLowerCase() !== "index.js") {
      log("loading  " + file);
      var model = db.sequelize.import(currentFile);
      db.models[model.name] = model;
    } // else ignore
  }
  log.undent();
}

/** Creates associations for @param models. */
function createAssociations(models) {
  log("loading associations");
  log.indent();
  for (const model_name of Object.keys(models)) {
    if ("associate" in models[model_name]) {
      log("loading for " + model_name);
      models[model_name].associate(models);
    }
  }
  log.undent();
  log("loaded associations");
}

/** Create/Sync default values with models. Asynchronous.*/
async function createDefaultValues (models, db_conf) {
  if (!db_conf.defaults) {
    log.warn("no defaults for any model defined!");
  } else {
    log("loading default values");
    log.indent();
    for (var model_name in db_conf.defaults) {
      log("loading default values of " + model_name);
      var model = db_conf.defaults[model_name];
      for (var default_value of model.default_values) {
        var search_object;
        for (var selector in model.selectors)
        await models[model_name].findOrCreate(default_value);
      }
    }
    log.undent();
    log("loaded default values");
  }
}

/** Sync models. Asynchronous.*/
async function syncSchemes(sequelize) {
  try {
    log("syncing models");
    await sequelize.sync({force:true}); // {force:true} //force deletes existing entries
    log("models synced.");
  } catch(err) {
    log.error("Could not synchronize database: " + err);
    //TODO throw
  };
}

/** Init function of the db. Returns Promise.
 * -establish connection
 * -load models
 * -load associations
 * TODO -[opt if creating a new db] db initialization with default values
 * -sync models
 */
this.init = async function init(db_conf) {
  this.models = {};
  //TODO just pass all parameters on for sequelize
  log(db_conf.uri)
  this.sequelize = new Sequelize(db_conf.uri, {
    logging: db_conf.logging ? log : false
  });

  await connect(this.sequelize);
  loadModels(this);
  createAssociations(this.models);
  await syncSchemes(this.sequelize);
  await createDefaultValues(this.models, db_conf);
}

module.exports = this;
