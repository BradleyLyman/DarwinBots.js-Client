var keyMirror = require('keymirror');

module.exports.ActionTypes = keyMirror({
  // Simulation Config actions
  SetInitialNrg           : null,
  SetNrgDecayRate         : null,

  // Simulation Actions
  NewSimulation : null,

  // Species Store actions
  AddSpecies    : null,
  DeleteSpecies : null
});
