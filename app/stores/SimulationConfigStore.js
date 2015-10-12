var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes,
    EventEmitter  = require('events'),
    assign        = require('object-assign'),
    LSUtil        = require('../util/LocalStorageUtil.js'),
    SpeciesStore  = require('../stores/SpeciesStore.js');

var CHANGE           = "change";
var simulationConfig = LSUtil.readValue('simulationConfig');
if (simulationConfig === undefined) {
  simulationConfig = {
    initialNrg    : 100,
    nrgDecayRate  : 2,
    speciesConfig : {}
  };
}

var SimulationConfigStore = assign({}, EventEmitter.prototype, {
  addChangeListener : function(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener : function(callback) {
    this.removeListener(CHANGE, callback);
  },

  emitChange : function() {
    this.emit(CHANGE);
  },

  getInitialNrg : function() {
    return simulationConfig.initialNrg;
  },

  getNrgDecayRate : function() {
    return simulationConfig.nrgDecayRate;
  },

  getSpeciesConfig : function() {
    return simulationConfig.speciesConfig;
  }
});

SimulationConfigStore.dispatcherToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SetInitialNrg:
      simulationConfig.initialNrg = action.initialNrg;
      LSUtil.writeValue('simulationConfig', simulationConfig);
      SimulationConfigStore.emitChange();
      break;

    case ActionTypes.SetNrgDecayRate:
      simulationConfig.nrgDecayRate = action.nrgDecayRate;
      LSUtil.writeValue('simulationConfig', simulationConfig);
      SimulationConfigStore.emitChange();
      break;

    case ActionTypes.SetSpeciesInitialPopulation:
      if (simulationConfig.speciesConfig[action.speciesName] === undefined) {
        simulationConfig.speciesConfig[action.speciesName] = {
          species           : SpeciesStore.getSpecies(action.speciesName),
          initialPopulation : action.initialPopulation
        };
      } else {
        simulationConfig.speciesConfig[action.speciesName].initialPopulation =
          action.initialPopulation;
      }
      LSUtil.writeValue('simulationConfig', simulationConfig);
      SimulationConfigStore.emitChange();
      break;

    case ActionTypes.NewSimulation:
      console.log(simulationConfig);
      break;

    default:
      // do nothing
      break;
  }
});

module.exports = SimulationConfigStore;
