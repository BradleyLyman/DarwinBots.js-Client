var React                 = require('react'),
    SimulationConfigStore = require('../stores/SimulationConfigStore.js'),
    SCActionCreators      = require('../actions/SimulationConfigActionCreators.js');

var theme     = require('./Theme.js'),
    Card      = require('material-ui/lib/card/card'),
    CardTitle = require('material-ui/lib/card/card-title'),
    CardText  = require('material-ui/lib/card/card-text'),
    Tabs      = require('material-ui/lib/tabs/tabs'),
    Tab       = require('material-ui/lib/tabs/tab'),
    TextField = require('material-ui/lib/text-field');

var isNumber = function(val) {
  var num = (+val);
  if (isNaN(num) || !isFinite(num)) {
    return false;
  }

  return true;
};

var NewSimulation = React.createClass({
  childContextTypes : {
    muiTheme : React.PropTypes.object
  },

  getChildContext : function() {
    return {
      muiTheme : theme
    };
  },

  getInitialState : function() {
    return {
      initialNrg   : SimulationConfigStore.getInitialNrg(),
      nrgDecayRate : SimulationConfigStore.getNrgDecayRate()
    };
  },

  componentWillMount : function() {
    SimulationConfigStore.addChangeListener(this.updateState);
  },

  componentWillUnmount : function() {
    SimulationConfigStore.removeChangeListener(this.updateState);
  },

  updateState : function() {
    this.setState({
      initialNrg   : SimulationConfigStore.getInitialNrg(),
      nrgDecayRate : SimulationConfigStore.getNrgDecayRate()
    });
  },

  render : function() {
    return (
      <Tabs>
        <Tab label="Simulation Parameters">
          <Card>
            <CardText className="row">
              <div className="col col-4">
                <TextField
                  value={this.state.initialNrg}
                  floatingLabelText="Initial Bot Nrg"
                  onChange={this.onInitialNrgChange}
                  ref="initialNrgInput" />
              </div>

              <div className="col col-4">
                <TextField
                  value={this.state.nrgDecayRate}
                  floatingLabelText="Rate of Nrg Decay Per Cycle"
                  onChange={this.onNrgDecayRateChange}
                  ref="nrgDecayRateInput" />
              </div>
            </CardText>
          </Card>
        </Tab>
      </Tabs>
    );
  },

  onInitialNrgChange : function() {
    var val = this.refs.initialNrgInput.getValue();
    if (isNumber(val)) {
      SCActionCreators.setInitialNrg(val);
    }
  },

  onNrgDecayRateChange : function() {
    var val = this.refs.nrgDecayRateInput.getValue();
    if (isNumber(val)) {
      SCActionCreators.setNrgDecayRate(val);
    }
  }
});

module.exports = NewSimulation;
