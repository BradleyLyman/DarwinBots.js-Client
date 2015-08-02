var Immutable = require('immutable'),
    keyMirror = require('keymirror');

module.exports.ActionTypes = Immutable.Map(keyMirror({
  DnaFileLoaded : null
}));
