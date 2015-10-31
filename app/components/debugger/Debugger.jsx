'use strict';
let React = require('react'),
    ReactRouter = require('react-router'),
    Theme = require('../Theme.js');

let SpeciesStore = require('../../stores/SpeciesStore.js');

let Debugger = React.createClass({
  mixins            : [ReactRouter.History],
  childContextTypes : { muiTheme : React.PropTypes.object },
  getChildContext   : function() { return { muiTheme : Theme }; },

  render : function() {
    let species = SpeciesStore.getSpecies(this.props.params.species);

    if (species === undefined) {
      return (
        <div className="content">
          <p>Species Not Found</p>
        </div>
      );
    }

    return (
      <div className="content">
        <h3>{species.name}</h3>
        <pre>{species.compileErr}</pre>
        <pre>{species.rawSource}</pre>
      </div>
    );
  },
});

module.exports = Debugger;
