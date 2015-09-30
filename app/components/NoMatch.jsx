var React = require('react');

var NoMatch = React.createClass({
  render : function() {
    return (
      <div className="content">
        <p>No Match for this url</p>
      </div>
    );
  }
});

module.exports = NoMatch;
