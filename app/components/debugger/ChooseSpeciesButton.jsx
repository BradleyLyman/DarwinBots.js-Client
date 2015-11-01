'use strict';
let React = require('react');

let RaisedButton = require('material-ui/lib/raised-button');

let ChooseSpeciesButton = React.createClass({
  render : function() {
    return <RaisedButton
      label="Choose New Species"
      primary={true}
      onClick={this._toAvailableSpecies} />;
  },

  _toAvailableSpecies : function() {
    this.props.history.pushState(null, '/available species');
  },
});

module.exports = ChooseSpeciesButton;
