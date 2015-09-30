var React = require('react');

var About = React.createClass({
  render : function() {
    return (
      <div className="content">
        <p>Welcome to DarwinBots.js, a web-based implementation
           of the classic DarwinBots ALife simulation. </p>

        <p>DarwinBots.js is not yet functinally complete, but progress
           is being made. Check out the repository at
           <a href='https://github.com/BradLyman/DarwinBots.Js'> the
           github page </a>
           for more information. </p>
      </div>
    );
  }
});

module.exports = About;
