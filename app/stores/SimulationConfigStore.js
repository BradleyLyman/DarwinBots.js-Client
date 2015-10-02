var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes,
    EventEmitter  = require('events'),
    assign        = require('object-assign');

var CHANGE     = "change";
var VERSION_ID = "0";

var simulationConfig;


var saveConfig = function() {
  simulationConfig.version = VERSION_ID;
  localStorage['simulationConfig'] = JSON.stringify(simulationConfig);
};

var SimulationConfigStore = assign({}, EventEmitter.prototype, {
  addChangeListener : function(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener : function(callback) {
    this.removeListener(CHANGE, callback);
  },

  emitChange : function() {
    this.emit(CHANGE);
  }
});

SimulationConfigStore.dispatcherToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    default:
      // do nothing
      break;
  }
});

module.exports = SimulationConfigStore;
