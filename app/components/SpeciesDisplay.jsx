var React                 = require('react'),
    SpeciesActionCreators = require('../actions/SpeciesActionCreators.js'),
    SpeciesStore          = require('../stores/SpeciesStore.js'),
    SimulationConfigStore = require('../stores/SimulationConfigStore.js'),
    SimulationConfigActionCreators =
      require('../actions/SimulationConfigActionCreators.js');

var FloatingActionButton = require('material-ui/lib/floating-action-button'),
    FlatButton           = require('material-ui/lib/flat-button'),
    FontIcon             = require('material-ui/lib/font-icon'),
    Card                 = require('material-ui/lib/card/card'),
    CardText             = require('material-ui/lib/card/card-text'),
    CardTitle            = require('material-ui/lib/card/card-title'),
    CardHeader           = require('material-ui/lib/card/card-header'),
    TextField            = require('material-ui/lib/text-field');

/**
 * Applies the callback to each property in object.
 **/
var forEachProperty = function(object, callback) {
  Object.keys(object).forEach(function(name) {
    callback(object[name], name);
  });
};

var isNumber = function(val) {
  var numval = +val;

  if (isNaN(numval) || !isFinite(numval)) {
    return false;
  }
  return true;
};

var SpeciesCard = React.createClass({
  render : function() {
    var config  = this.props.speciesConfig || { initialPopulation : 0 };
    var species = this.props.species;
    var actionItem = (
      <TextField
        floatingLabelText="Amount In Simulation"
        value={config.initialPopulation}
        onChange={function(val) {
          if (isNumber(val.target.value)) {
            SimulationConfigActionCreators.setSpeciesInitialPopulation(
              species.name, val.target.value
            );
          }
        }}/>
    );

    if (!species.isValid) {
      actionItem = (
        <div>
          <p>Cannot use species -- compiler error:</p>
          <br />
          <pre>{species.compileErr}</pre>
        </div>
      );
    }

    return (
      <Card initiallyExpanded={false}>
        <CardHeader
          avatar={<div/>}
          showExpandableButton={true}
          actAsExpander={true}>
          <p style={{ fontSize : '1.2em' }}>{species.name}</p>
        </CardHeader>

        <CardText expandable={true}>
          <div className="row">
            {actionItem}
            <br />
          </div>
          <div className="row">
            <FlatButton label="remove" onClick={
              function() {
                SpeciesActionCreators.deleteSpecies(species.name);
              }}/>
          </div>
        </CardText>
      </Card>
    );
  }
});

var SpeciesDisplay = React.createClass({
  handleFileUpload : function(e) {
    SpeciesActionCreators.loadSpeciesFile(e.target.files[0]);
    e.target.value = "";
  },

  _openFileDialog : function() {
    var fileUpload = React.findDOMNode(this.refs.fileUpload);
    fileUpload.click();
  },

  getInitialState : function() {
    return {
      speciesMap    : SpeciesStore.getSpeciesMap(),
      speciesConfig : SimulationConfigStore.getSpeciesConfig()
    };
  },

  _onStoreUpdate : function() {
    this.setState({
      speciesMap : SpeciesStore.getSpeciesMap(),
    });
  },

  _onConfigUpdate : function() {
    this.setState({
      speciesConfig : SimulationConfigStore.getSpeciesConfig()
    });
  },

  componentWillMount : function() {
    SpeciesStore.addChangeListener(this._onStoreUpdate);
    SimulationConfigStore.addChangeListener(this._onConfigUpdate);
  },

  componentWillUnmount : function() {
    SpeciesStore.removeChangeListener(this._onStoreUpdate);
    SimulationConfigStore.removeChangeListener(this._onConfigUpdate);
  },

  render : function() {
    var _openFileDialog = this._openFileDialog;
    var speciesMap = this.state.speciesMap;
    var speciesConfig = this.state.speciesConfig;
    var speciesCards = [];

    forEachProperty(speciesMap, function(species, name) {
      speciesCards.push(
        <SpeciesCard
          species={species}
          speciesConfig={speciesConfig[name]}
          key={name} />
      );
    });

    return (
      <div>
        {speciesCards}

        <br />

        <FloatingActionButton onClick={this._openFileDialog}>
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>

        <input
          type="file"
          style={{ display : "none" }}
          onChange={this.handleFileUpload}
          ref="fileUpload" />
      </div>
    );
  }
});

module.exports = SpeciesDisplay;
