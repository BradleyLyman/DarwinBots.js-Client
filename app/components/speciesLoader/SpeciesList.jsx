'use strict';
let React = require('react'),
    Theme = require('../Theme.js');

let List       = require('material-ui/lib/lists/list'),
    ListItem   = require('material-ui/lib/lists/list-item'),
    IconButton = require('material-ui/lib/icon-button'),
    FontIcon   = require('material-ui/lib/font-icon');

let SpeciesActionCreators = require('../../actions/SpeciesActionCreators.js');

let SpeciesList = React.createClass({
  childContextTypes : { muiTheme : React.PropTypes.object },
  getChildContext   : function() { return { muiTheme : Theme }; },

  render : function() {
    let speciesMap = this.props.speciesMap;
    let names      = Object.keys(speciesMap);

    let nameDisplay = names.map(name => {
      let species = speciesMap[name];

      let button = (
        <IconButton onClick={() => SpeciesActionCreators.deleteSpecies(name)}>
          <FontIcon className="material-icons">clear</FontIcon>
        </IconButton>
      );

      let errorOrSuccess = species.compileErr || species.rawSource;

      return <ListItem
        key={name}
        primaryText={name}
        secondaryText={errorOrSuccess}
        rightIconButton={button} />;
    });

    return (
      <List>
        {nameDisplay}
      </List>
    );
  },
});

module.exports = SpeciesList;
