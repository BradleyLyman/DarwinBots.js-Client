'use strict';
let React = require('react');

let SpeciesList = React.createClass({
  render : function() {
    let names = Object.keys(this.props.speciesMap);

    let nameDisplay = names.map(name =>
      <div>{name}</div>
    );

    return (
      <div>
        {nameDisplay}
      </div>
    );
  },
});

module.exports = SpeciesList;
