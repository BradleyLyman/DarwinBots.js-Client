'use strict';
let React = require('react'),
    ReactRouter = require('react-router'),
    Theme = require('../Theme.js');

let SpeciesStore = require('../../stores/SpeciesStore.js');

let ChooseSpeciesButton = require('./ChooseSpeciesButton.jsx'),
    SpeciesCard         = require('./SpeciesCard.jsx');

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
        <div className="row">
          <ChooseSpeciesButton history={this.history} />
          <div style={{ marginBottom : '1em' }}/>
        </div>

        <div className="row">
          <div className="col col-6">
            <SpeciesCard species={species}/>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Debugger;
