'use strict';
let React    = require('react'),
    Theme    = require('../Theme.js');

let FloatingActionButton = require('material-ui/lib/floating-action-button'),
    FontIcon = require('material-ui/lib/font-icon');

let SpeciesActionCreators = require('../../actions/SpeciesActionCreators.js');

let AddSpeciesButton = React.createClass({
  childContextTypes : { muiTheme : React.PropTypes.object },
  getChildContext : function() { return { muiTheme : Theme }; },

  render : function() {
    return (
      <div>
        <FloatingActionButton onClick={this._openFileInput}>
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>

        <input
          type="file"
          ref="fileInput"
          style={{ display : 'none' }}
          onChange={this._onFileInputChange} />
      </div>
    );
  },

  _openFileInput : function() {
    let node = React.findDOMNode(this.refs.fileInput);
    node.click();
  },

  _onFileInputChange : function(e) {
    if (e.target.files[0] !== undefined) {
      SpeciesActionCreators.loadSpeciesFile(e.target.files[0]);
    }
    e.target.value = "";
  },
});

module.exports = AddSpeciesButton;
