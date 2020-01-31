/** Provides some simple logging with a prompt and indentions */
module.exports = function(_prompt, _prompt_length, _indent_length) {
  let prompt = _prompt ? _prompt : "log";
  let prompt_length = _prompt_length ? _prompt_length : 3;
  let indent_length = _indent_length ? _indent_length : 2;

  prompt_length = Math.max(prompt.length, prompt_length);
  prompt = prompt + String(" ").repeat(prompt_length - prompt.length) + " | ";
  let indent_string = String(" ").repeat(indent_length);
  let indention = "";

  let log = function(string) {
    console.info("INFO  | " + prompt + indention + string);
  }

  log.log = log;

  log.indent = function() {
    indention += indent_string;
  }

  log.undent = function() {
    indention = indention.substring(indent_length);
  }
  log.unindent = log.undent;

  log.error = function(string) {
    console.error("ERROR | " + prompt + string);
  }

  log.warn = function(string) {
    console.warn("WARN  | " + prompt + string);
  }

  log.debug = function(string) {
    console.debug("DEBUG | " + prompt + indention + string);
  }

  log.info = log;

  return log;
};
