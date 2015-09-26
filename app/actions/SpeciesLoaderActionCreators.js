var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes;

module.exports = {
  loadSpeciesFile : function(file) {
    var reader = new FileReader();

    reader.onload = function() {
      AppDispatcher.dispatch({
        type      : ActionTypes.get('LoadSpecies'),
        rawSource : reader.result,
        name      : file.name
      });
    };
    reader.readAsText(file);
  }
};
