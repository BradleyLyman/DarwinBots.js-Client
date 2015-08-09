var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes;

module.exports = {
  loadSpeciesFile : function(file) {
    console.log("file: ", file);
    AppDispatcher.dispatch({
      type : ActionTypes.get("LoadSpecies")
    });
  }
};
