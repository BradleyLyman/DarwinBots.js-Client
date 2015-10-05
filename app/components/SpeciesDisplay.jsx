var React                 = require('react'),
    SpeciesActionCreators = require('../actions/SpeciesActionCreators.js'),
    SpeciesStore          = require('../stores/SpeciesStore.js');

var FloatingActionButton = require('material-ui/lib/floating-action-button'),
    FlatButton           = require('material-ui/lib/flat-button'),
    FontIcon             = require('material-ui/lib/font-icon'),
    Card                 = require('material-ui/lib/card/card'),
    CardText             = require('material-ui/lib/card/card-text'),
    CardHeader           = require('material-ui/lib/card/card-header');

var SpeciesDisplay = React.createClass({
  handleFileUpload : function(e) {
    SpeciesActionCreators.loadSpeciesFile(e.target.files[0]);
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
    var speciesNames = Object.getOwnPropertyNames(this.state.speciesMap);
    var speciesCards = [];

    speciesNames.forEach(function(name, index) {
      var species = speciesMap[name];
      var speciesCard = (
        <Card key={index} initiallyExpanded={false}>
          <CardHeader
            showExpandableButton={true}
            avatar={<div/>}>
            <p style={{ fontSize : '1.3em' }}>{name}</p>
          </CardHeader>

          <CardText expandable={true}>
            <div className="row">
              <div className="col col-6">
                <FlatButton
                  label="reupload"
                  onClick={_openFileDialog} />
              </div>
              <div className="col col-6">
                <FlatButton
                  secondary={true}
                  label="remove"
                  onClick={function() {
                    SpeciesActionCreators.deleteSpecies(name);
                  }}/>
              </div>
            </div>
            <pre>{species.compileErr}</pre>
            <hr />
            <pre>{species.rawSource}</pre>
          </CardText>
        </Card>
      );
      speciesCards.push(speciesCard);
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
