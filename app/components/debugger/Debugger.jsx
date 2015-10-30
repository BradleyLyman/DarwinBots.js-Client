'use strict';
let React = require('react'),
    SpeciesStore = require('../../stores/SpeciesStore.js');

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
      <div className="content"> aoeu </div>
    );
  },

  _updateSpeciesMap : function() {
    this.setState({
      speciesMap : SpeciesStore.getSpeciesMap()
    });
  },
});

module.exports = Debugger;
