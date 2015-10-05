var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes;

module.exports = {
  /**
   * Creates a new simulation using the configuration available in the
   * SimulationConfigStore.
   * TODO: not complete, the simconfigstore just dumps to the console for
   * now.
   **/
  createNewSimulation : function() {
    AppDispatcher.dispatch({
      type : ActionTypes.NewSimulation
    });
  }
};
