var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    DarwinBots    = require('darwinbots.js'),
    ActionTypes   = AppConstants.ActionTypes,
    EventEmitter  = require('events'),
    assign        = require('object-assign'),
    Immutable     = require('immutable');

var CHANGE      = "change";
var _speciesMap = Immutable.fromJS(
  JSON.parse(localStorage.getItem('speciesStore') || "{}")
);

// Parse dna in local storage, keep whatever correctly parses
_speciesMap = _speciesMap.reduce(function(map, value, key) {
  var tokens      = DarwinBots.Tokenizer.tokenize(value.get('source')),
      parseResult = DarwinBots.Parser.parseDna(tokens);

  if (parseResult.error !== null) {
    return map;
  }

  return map.set(key, value.set('cmd', parseResult.result));
}, Immutable.Map());

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
      localStorage.setItem('speciesStore', JSON.stringify(_speciesMap.toJS()));
      SpeciesStore.emitChange();
      break;

    default:
      // do nothing
      break;
  }
});

module.exports = SpeciesStore;









