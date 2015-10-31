'use strict';
let React = require('react'),
    SpeciesStore = require('../../stores/SpeciesStore.js');

let SpeciesList      = require('./SpeciesList.jsx'),
    AddSpeciesButton = require('./AddSpeciesButton.jsx');

let Debugger = React.createClass({
  getInitialState : function() {
    return {
      speciesMap : SpeciesStore.getSpeciesMap()
    };
  },

  componentDidMount : function() {
    SpeciesStore.addChangeListener(this._updateSpeciesMap);
  },

  componentWillUnmount : function() {
    SpeciesStore.removeChangeListener(this._updateSpeciesMap);
  },

  render : function() {
    return (
      <div className="content">
        <SpeciesList speciesMap={this.state.speciesMap} />
        <AddSpeciesButton />
      </div>
    );
  },

  _updateSpeciesMap : function() {
    this.setState({
      speciesMap : SpeciesStore.getSpeciesMap()
    });
  },
});

module.exports = Debugger;
