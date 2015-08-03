var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    DarwinBots    = require('darwinbots.js'),
    ActionTypes   = AppConstants.ActionTypes;

module.exports = {
  loadSpecies : function(file) {
    var reader = new FileReader();

    reader.onload = function() {
      var tokens      = DarwinBots.Tokenizer.tokenize(reader.result),
          parseResult = DarwinBots.Parser.parseDna(tokens);

      if (parseResult.error !== null) {
        AppDispatcher.dispatch({
          type  : ActionTypes.get("ErrorLoadingSpecies"),
          error : parseResult.error
        });
      }
      else {
        AppDispatcher.dispatch({
          type      : ActionTypes.get("AddSpecies"),
          dnaSource : reader.result,
          dnaCmd    : parseResult.result,
          name      : file.name
        });
      }
    };
    reader.readAsText(file);
  }
};
