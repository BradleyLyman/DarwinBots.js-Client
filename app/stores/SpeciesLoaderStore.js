var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    EventEmitter  = require('events').EventEmitter,
    Immutable     = require('immutable'),
    assign        = require('object-assign'),
    ActionTypes   = AppConstants.ActionTypes;

var _speciesMap = Immutable.Map(),
    _error = "";

var _addSpecies = function(dnaSource, dnaCmd, name) {
  _speciesMap = _speciesMap.set(name, Immutable.Map({
    dnaSource : dnaSource,
    dnaCmd    : dnaCmd
  }));
};

var _setError = function(error) {
  _error = error.message;
};

var CHANGE_EVENT = 'change';

var SpeciesLoaderStore = assign({}, EventEmitter.prototype, {
  emitChange : function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener : function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener : function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getError : function() {
    return _error;
  },

  getSpeciesMap : function() {
    return _speciesMap;
  },

  getSpeciesByName : function(name) {
    return _speciesList.find(function(species) {
      return species.get("name") === name;
    });
  }
});

SpeciesLoaderStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.get("AddSpecies"):
      _addSpecies(action.dnaSource, action.dnaCmd, action.name);
      _setError({ message : "" });
      SpeciesLoaderStore.emitChange();
      break;

    case ActionTypes.get("ErrorLoadingSpecies"):
      _setError(action.error);
      SpeciesLoaderStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = SpeciesLoaderStore;







