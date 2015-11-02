'use strict';
let React = require('react');

let TextField = require('material-ui/lib/text-field');

let SysvarAdder = React.createClass({
  render : function() {
    return (
      <TextField
        floatingLabelText="Add Sysvar"
        ref="newSysvar"
        onEnterKeyDown={this._onSysvarAdderChange}/>
    );
  },

  _onSysvarAdderChange : function() {
    let name = this.refs.newSysvar.getValue();
    this.refs.newSysvar.clearValue();

    this.props.addSysvar(name);
  },
});

module.exports = SysvarAdder;
