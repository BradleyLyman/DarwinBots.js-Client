var React = require('react'),
    SCActionCreators = require('../../actions/SimulationConfigActionCreators.js');

var theme = require('../Theme.js'),
    TextField = require('material-ui/lib/text-field');

var isNumber = function(val) {
  var num = (+val);
  if (isNaN(num) || !isFinite(num)) {
    return false;
  }

  return true;
};

var ConfigParameters = React.createClass({
  childContextTypes : {
    muiTheme : React.PropTypes.object
  },

  getChildContext : function() {
    return {
      muiTheme : theme
    };
  },

  render : function() {
    return (
      <div className="row">
        <div className="col col-4">
          <TextField fullWidth={true}
            value={this.props.initialNrg}
            floatingLabelText="Initial Bot Nrg"
            onChange={this.onInitialNrgChange}
            ref="initialNrgInput" />
        </div>

        <div className="col col-4">
          <TextField fullWidth={true}
            value={this.props.nrgDecayRate}
            floatingLabelText="Rate of Nrg Decay Per Cycle"
            onChange={this.onNrgDecayRateChange}
            ref="nrgDecayRateInput" />
        </div>
      </div>
    );
  },

  onInitialNrgChange : function() {
    var val = this.refs.initialNrgInput.getValue();
    if (isNumber(val)) {
      SCActionCreators.setInitialNrg(+val);
    }
  },

  onNrgDecayRateChange : function() {
    var val = this.refs.nrgDecayRateInput.getValue();
    if (isNumber(val)) {
      SCActionCreators.setNrgDecayRate(val);
    }
  }
});

module.exports = ConfigParameters;
