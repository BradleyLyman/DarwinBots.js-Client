'use strict';
var React = require('react');

module.exports = React.createClass({
  render : function() {
    return (
      <div className="container">
        <div className="card-panel">
          <h4>Welcome to DarwinBots.js!</h4>
          <hr />
          <p>
            DarwinBots.js is a html5/javascript port of the classic
            artificial life
            simulator <a href="http://wiki.darwinbots.com/w/Main_Page" target="_blank">DarwinBots</a>.
          </p>
          <p>
            Getting started is easy, check out the <a href="#/speciesLoader">species loader</a>.
          </p>
        </div>
      </div>
    );
  }
});
