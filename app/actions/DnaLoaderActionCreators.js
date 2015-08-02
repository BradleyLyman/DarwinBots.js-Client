'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    Tokenizer     = require('../../../src/dnainterpreter/tokenizer.js'),
    Parser        = require('../../../src/dnainterpreter/parser.js'),

    ActionTypes = AppConstants.ActionTypes;

module.exports = {
  parseDna : function(file) {
    var reader = new FileReader();

    reader.onload = function() {
      AppDispatcher.dispatch({
        type       : ActionTypes.get("DnaFileLoaded"),
        error      : undefined,
        source     : reader.result,
        sourceName : file.name
      });
    };
    reader.readAsText(file);
  }
};
