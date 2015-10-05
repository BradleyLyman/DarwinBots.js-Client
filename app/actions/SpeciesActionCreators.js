var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes;

module.exports = {
  /**
   * Loads the contents of the file into memory and dispatches it to the
   * species store.
   **/
  loadSpeciesFile : function(file) {
    var reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = function() {
      AppDispatcher.dispatch({
        type      : ActionTypes.AddSpecies,
        name      : file.name,
        rawSource : reader.result
      });
    };
  },

  /**
   * Removes the species specified from the species store.
   * @param {String} name - The name of the species to delete.
   **/
  deleteSpecies : function(name) {
    AppDispatcher.dispatch({
      type : ActionTypes.DeleteSpecies,
      name : name
    });
  }
};

