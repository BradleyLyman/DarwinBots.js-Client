var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstants  = require('../constants/AppConstants.js'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('object-assign'),
    ActionTypes   = AppConstants.ActionTypes;

var _source     = "",
    _sourceName = "",
    _error      = undefined;

var CHANGE_EVENT = 'change';

var DnaLoaderStore = assign({}, EventEmitter.prototype, {
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

  getSource : function() {
    return _source;
  },

  getSourceName : function() {
    return _sourceName;
  }
});

DnaLoaderStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.get("DnaFileLoaded"):
      _error      = action.error;
      _source     = action.source;
      _sourceName = action.sourceName;
      DnaLoaderStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = DnaLoaderStore;
