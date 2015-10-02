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
            <CardText>
              <TextField
                value={this.state.initialNrg}
                floatingLabelText="Initial Bot Nrg" />
            </CardText>
          </Card>
        </Tab>
      </Tabs>
    );
  }
});

module.exports = NewSimulation;
