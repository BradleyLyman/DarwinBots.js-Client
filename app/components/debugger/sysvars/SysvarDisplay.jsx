'use strict';
let React = require('react');

let TextField  = require('material-ui/lib/text-field'),
    IconButton = require('material-ui/lib/icon-button'),
    FontIcon   = require('material-ui/lib/font-icon');

let SysvarDisplay = React.createClass({
  render : function() {
    return (
      <div className="row">
        <div className="col col-9">
          <TextField
            value={this.props.value}
            floatingLabelText={this.props.name}
            onChange={(e) => {
              this.props.valueChanged(e.target.value)
            }}/>
        </div>
        <div className="col col-3">
          <div
            style={{position : 'absolute', top : '1.5em'}}>
            <IconButton
              onClick={this.props.removeSysvar}>
              <FontIcon
                className="material-icons">
                clear
              </FontIcon>
            </IconButton>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = SysvarDisplay;
