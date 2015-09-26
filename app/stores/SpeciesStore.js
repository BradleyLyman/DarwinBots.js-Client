var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    Species       = require('./SpeciesStore/Species.js'),
    ActionTypes   = AppConstants.ActionTypes,
    EventEmitter  = require('events'),
    assign        = require('object-assign'),
    Immutable     = require('immutable');

var CHANGE      = "change";

var _speciesMap = Immutable.fromJS(
  JSON.parse(localStorage.getItem('speciesStore') || "{}")
).map(function(value, key) {
  return Species.create(value.get('rawSource'), key);
});

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
      _speciesMap = _speciesMap.set(action.name,
        Species.create(action.rawSource, action.name)
      );

      localStorage.setItem('speciesStore', JSON.stringify(_speciesMap.toJS()));
      SpeciesStore.emitChange();
      break;

    default:
      // do nothing
      break;
  }
});


module.exports = SpeciesStore;









