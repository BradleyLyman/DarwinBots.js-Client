var React                 = require('react'),
    SimulationConfigStore = require('../stores/SimulationConfigStore.js');

var theme     = require('./Theme.js'),
    Card      = require('material-ui/lib/card/card'),
    CardTitle = require('material-ui/lib/card/card-title'),
    CardText  = require('material-ui/lib/card/card-text'),
    Tabs      = require('material-ui/lib/tabs/tabs'),
    Tab       = require('material-ui/lib/tabs/tab'),
    TextField = require('material-ui/lib/text-field');

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
                  floatingLabelText="Initial Bot Nrg" />
              </div>

              <div className="col col-4">
                <TextField
                  value={this.state.nrgDecayRate}
                  floatingLabelText="Rate of Nrg Decay Per Cycle" />
              </div>
            </CardText>
          </Card>
        </Tab>
      </Tabs>
    );
  }
});

module.exports = NewSimulation;
