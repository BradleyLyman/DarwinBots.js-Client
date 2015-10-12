var React                 = require('react'),
    SpeciesActionCreators = require('../actions/SpeciesActionCreators.js'),
    SpeciesStore          = require('../stores/SpeciesStore.js');

var FloatingActionButton = require('material-ui/lib/floating-action-button'),
    FlatButton           = require('material-ui/lib/flat-button'),
    FontIcon             = require('material-ui/lib/font-icon'),
    Card                 = require('material-ui/lib/card/card'),
    CardText             = require('material-ui/lib/card/card-text'),
    CardTitle            = require('material-ui/lib/card/card-title'),
    TextField            = require('material-ui/lib/text-field');

/**
 * Applies the callback to each property in object.
 **/
var forEachProperty = function(object, callback) {
  Object.keys(object).forEach(function(name) {
    callback(object[name], name);
  });
};

var SpeciesCard = React.createClass({
  render : function() {
    var species = this.props.species;
    var actionItem = (
      <div className="row">
        <div className="col col-6">
          <TextField
            floatingLabelText="Amount In Simulation" />
        </div>
      </div>
    );

    if (!this.props.species.isValid) {
      actionItem = (
        <p>
          Cannot use species, there was an error during compilation.
        </p>
      );
    }

    return (
      <Card>
        <CardTitle>{species.name}</CardTitle>
        <CardText>
          {actionItem}
        </CardText>
        <CardText>
          <FlatButton label="remove" onClick={
            function() {
              SpeciesActionCreators.deleteSpecies(species.name);
            }}/>
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
      speciesMap : SpeciesStore.getSpeciesMap()
    };
  },

  _onStoreUpdate : function() {
    this.setState({
      speciesMap : SpeciesStore.getSpeciesMap()
    });
  },

  componentWillMount : function() {
    SpeciesStore.addChangeListener(this._onStoreUpdate);
  },

  componentWillUnmount : function() {
    SpeciesStore.removeChangeListener(this._onStoreUpdate);
  },

  render : function() {
    var _openFileDialog = this._openFileDialog;
    var speciesMap = this.state.speciesMap;
    var speciesCards = [];

    forEachProperty(speciesMap, function(species, name) {
      speciesCards.push(<SpeciesCard species={species} key={name} />);
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
