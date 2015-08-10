var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    ActionTypes   = AppConstants.ActionTypes,
    EventEmitter  = require('events'),
    assign        = require('object-assign'),
    Immutable     = require('immutable');

var CHANGE      = "change";
var _speciesMap = Immutable.Map();

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

  getSpeciesMap : function() {
    return _speciesMap;
  }
});

SpeciesStore.dispatcherToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.get("LoadSpecies"):
      _speciesMap = _speciesMap.set(action.name, Immutable.Map({
        source : action.source,
        cmd    : action.cmd
      }));
      SpeciesStore.emitChange();
      break;

    default:
      // do nothing
      break;
  }
});

module.exports = SpeciesStore;









