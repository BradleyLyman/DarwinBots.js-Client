var React                       = require('react'),
    SpeciesLoaderActionCreators = require('../actions/SpeciesLoaderActionCreators.js'),
    SpeciesStore                = require('../stores/SpeciesStore.js'),
    mui                         = require('material-ui'),
    Card                        = mui.Card,
    CardTitle                   = mui.CardTitle,
    CardText                    = mui.CardText,
    RaisedButton                = mui.RaisedButton,
    List                        = mui.List,
    ListItem                    = mui.ListItem;

module.exports = React.createClass({
  contextTypes : {
    router : React.PropTypes.func
  },

  getInitialState : function() {
    return {
      speciesMap : SpeciesStore.getSpeciesMap()
    };
  },

  componentWillMount : function() {
    console.log("SpeciesLoader mounted");
    SpeciesStore.addChangeListener(this._onSpeciesChange);
  },

  componentWillUnmount : function() {
    console.log("SpeciesLoader unmounted");
    SpeciesStore.removeChangeListener(this._onSpeciesChange);
  },

  render : function() {
    var router = this.context.router;
    var speciesList = this.state.speciesMap.map(function(payload, key) {
      var toDebug = function() { router.transitionTo("/speciesDebugger/" + key); };
      var source = <pre>{payload.error || payload.rawSource}</pre>;

      return <ListItem
        key={key}
        primaryText={key}
        secondaryText={source}
        onClick={toDebug} />;
    }).toList();

    return (
      <Card>
        <CardTitle title="Load Species" />
        <CardText>
          <List>
            {speciesList}
          </List>
        </CardText>
        <CardText>

          <label htmlFor="filePicker">
            <RaisedButton onClick={this._activateFileInput} label="Load" primary={true}/>
            <input type="file"
                   style={{ display : 'none' }}
                   id="filePicker"
                   onChange={this._fileChange}
                   ref="filePicker"/>
          </label>

        </CardText>
      </Card>
    );
  },

  _activateFileInput : function() {
    this.refs.filePicker.getDOMNode().click();
  },

  _fileChange : function(e) {
    SpeciesLoaderActionCreators.loadSpeciesFile(e.nativeEvent.srcElement.files[0]);
    this.refs.filePicker.getDOMNode().value = "";
  },

  _onSpeciesChange : function() {
    this.setState({
      speciesMap : SpeciesStore.getSpeciesMap()
    });
  }
});






