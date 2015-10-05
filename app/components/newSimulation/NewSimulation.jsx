var React                    = require('react'),
    SimulationConfigStore    = require('../../stores/SimulationConfigStore.js'),
    SimActionCreators = require('../../actions/SimulationActionCreators.js');

var theme            = require('../Theme.js'),
    Tabs             = require('material-ui/lib/tabs/tabs'),
    Tab              = require('material-ui/lib/tabs/tab'),
    RaisedButton     = require('material-ui/lib/raised-button'),
    ConfigParameters = require('./ConfigParameters.jsx');

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
      <div>
        <Tabs>
          <Tab label="Simulation Parameters">
            <div className="content">
              <ConfigParameters
                initialNrg={this.state.initialNrg}
                nrgDecayRate={this.state.nrgDecayRate} />
            </div>
          </Tab>
        </Tabs>

        <div className="content">
          <RaisedButton
            label="Create Simulation"
            primary={true}
            onClick={function() {
              SimActionCreators.createNewSimulation();
            }} />
        </div>
      </div>
    );
  },
});

module.exports = NewSimulation;
