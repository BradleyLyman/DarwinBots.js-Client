var React = require('react');

var lineNumStyle = {
  paddingRight : '0.5em',
  borderRight  : '1px solid lightGrey',
  textAlign    : 'right'
};

var lineStyle = {
  paddingLeft : '0.2em'
};

var SourceCode = React.createClass({
  render : function() {
    var splitSource = this.props.sourceCode.split('\n');
    var sourceLines = splitSource.map(function(lineString, index) {
      var lineNum = index + 1;
      return (
        <tr>
          <td className="lineNum" style={lineNumStyle}>
            {lineNum}
          </td>
          <td className="lineRow" style={lineStyle}>
            <pre>{lineString}</pre>
          </td>
        </tr>
      );
    });

    return (
      <table>
        {sourceLines}
      </table>
    );
  }
});

module.exports = SourceCode;
