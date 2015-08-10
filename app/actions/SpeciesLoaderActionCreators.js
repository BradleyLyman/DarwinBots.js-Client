var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes,
    DarwinBots    = require('darwinbots.js'),
    Tokenizer     = DarwinBots.Tokenizer,
    Parser        = DarwinBots.Parser;

module.exports = {
  loadSpeciesFile : function(file) {
    var reader = new FileReader();

    reader.onload = function() {
      var tokens      = Tokenizer.tokenize(reader.result),
          parseResult = Parser.parseDna(tokens);

      if (parseResult.error === null) {
        AppDispatcher.dispatch({
          type   : ActionTypes.get("LoadSpecies"),
          source : reader.result,
          name   : file.name,
          cmd    : parseResult.result
        });
      }
    };
    reader.readAsText(file);
  }
};
