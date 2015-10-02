var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes;

module.exports = {
  /**
   * Creates and dispatches an action to set the initialNrg in the
   * simulation configuration.
   * @param {Number} initialNrg - The initial nrg quantity for bots in the sim.
   **/
  setInitialNrg : function(initialNrg) {
    AppDispatcher.dispatch({
      type       : ActionTypes.SetInitialNrg,
      initialNrg : initialNrg
    });
  },

  /**
   * Creates and dispatches an action to set the nrgDecayRate in the
   * simulation configuration.
   * @param {Number} nrgDecayRate - The rate that a bot's nrg decays per cycle.
   **/
  setNrgDecayRate : function(nrgDecayRate) {
    AppDispatcher.dispatch({
      type         : ActionTypes.SetNrgDecayRate,
      nrgDecayRate : nrgDecayRate
    });
  }
};
