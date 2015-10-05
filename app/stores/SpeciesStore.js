var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ActionTypes   = require('../constants/AppConstants.js').ActionTypes,
    DarwinBots    = require('darwinbots.js'),
    EventEmitter  = require('events'),
    assign        = require('object-assign'),
    LSUtil        = require('../util/LocalStorageUtil.js');

var CHANGE = "change";
var speciesMap = LSUtil.readValue('speciesMap');
if (speciesMap === undefined) {
  speciesMap = {};
} else {
  var speciesNames = Object.getOwnPropertyNames(speciesMap);
  var newMap = {};

  speciesNames.forEach(function(name) {
    newMap[name] = DarwinBots.Species.createSpecies(
      speciesMap[name].rawSource, name
    );
  });

  speciesMap = newMap;
}

var SpeciesStore = assign({}, EventEmitter.prototype, {
  addChangeListener : function(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener : function(callback) {
    this.removeListener(CHANGE, callback);
  },

  emitChange : function() {
    this.emit(CHANGE);
  },

  getSpecies : function(name) {
    return speciesMap[name];
  },

  getSpeciesMap : function() {
    return speciesMap;
  }
});

SpeciesStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.AddSpecies:
      var species = DarwinBots.Species.createSpecies(
        action.rawSource, action.name
      );
      speciesMap[action.name] = species;
      LSUtil.writeValue('speciesMap', speciesMap);

      SpeciesStore.emitChange();
      console.log(speciesMap);
      break;

    case ActionTypes.DeleteSpecies:
      delete speciesMap[action.name];
      LSUtil.writeValue('speciesMap', speciesMap);
      SpeciesStore.emitChange();
      break;

    default:
      // do nothing
      break;
  }
});

module.exports = SpeciesStore;
