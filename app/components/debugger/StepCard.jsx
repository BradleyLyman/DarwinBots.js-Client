'use strict';
let React = require('react');

let MUICard      = require('material-ui/lib/card'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Card         = MUICard.Card,
    CardHeader   = MUICard.CardHeader,
    CardText     = MUICard.CardText;

let SysvarDisplay = require('./sysvars/SysvarDisplay.jsx'),
    SysvarAdder   = require('./sysvars/SysvarAdder.jsx');

let StepCard = React.createClass({
  getInitialState : function() {
    return {
      sysvars : { nrg : 100, posX : 10, posY : 11 },
    };
  },

  _updateSysvar : function(name, value) {
    let sysvars   = this.state.sysvars;
    sysvars[name] = value;

    this.setState({
      sysvars : sysvars,
    });
  },

  _removeSysvar : function(name) {
    delete this.state.sysvars[name];
    this.setState({
      sysvars : this.state.sysvars,
    });
  },

  _sysvarSafeCopy : function() {
    let sysvars = this.state.sysvars;
    let names   = Object.keys(sysvars);

    return names.reduce((safeVars, name) => {
      let val = +sysvars[name];
      if (isNaN(val)) {
        return safeVars;
      } else {
        safeVars[name] = val;
        return safeVars;
      }
    }, {});
  },

  render : function() {
    let _updateSysvar = this._updateSysvar;
    let _removeSysvar = this._removeSysvar;
    let sysvars       = this.state.sysvars;
    let sysvarNames   = Object.keys(sysvars);
    let sysvarListing = sysvarNames.map(name => {
      let updateFctn = (val) => _updateSysvar(name, val);
      let remove = () => _removeSysvar(name);
      return (
        <SysvarDisplay
          key={name}
          name={name}
          value={sysvars[name]}
          valueChanged={updateFctn}
          removeSysvar={remove}/>
      );
    });

    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          avatar={<div />}
          showExpandableButton={true}>
          <h3 style={{ fontSize : '1.2em', }}>
            Debugger
          </h3>
        </CardHeader>

        <CardText expandable={true}>
          <RaisedButton
            label="Execute 1 Cycle"
            onClick={this._executeDna} />
          {sysvarListing}
          <SysvarAdder
            addSysvar={this._addSysvar}/>
        </CardText>
      </Card>
    );
  },

  _addSysvar : function(name) {
    let sysvars = this.state.sysvars;
    sysvars[name] = 0;

    this.setState({
      sysvars : sysvars,
    });
  },

  _executeDna : function() {
    let sysvars = this._sysvarSafeCopy();

    this.props.species.dna.execute(sysvars);

    this.setState({
      sysvars : sysvars,
    });
  },
});

module.exports = StepCard;
