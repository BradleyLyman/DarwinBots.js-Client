var React                       = require('react'),
    SpeciesLoaderActionCreators = require('../actions/SpeciesLoaderActionCreators.js'),
    SpeciesStore                = require('../stores/SpeciesStore.js'),
    mui                         = require('material-ui'),
    Card                        = mui.Card,
    CardTitle                   = mui.CardTitle,
    CardText                    = mui.CardText,
    RaisedButton                = mui.RaisedButton;

module.exports = React.createClass({
  render : function() {
    return (
      <Card>
        <CardTitle title="Load Species" />
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
    console.log(e.nativeEvent.srcElement.files[0].name);
    this.refs.filePicker.getDOMNode().value = "";
  }
});
