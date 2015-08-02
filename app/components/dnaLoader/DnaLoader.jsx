'use strict';
var React                   = require('react'),
    DnaLoaderActionCreators = require('../../actions/DnaLoaderActionCreators.js'),
    DnaLoaderStore          = require('../../stores/DnaLoaderStore.js');

require('./DnaLoader.css');

module.exports = React.createClass({
  getInitialState : function() {
    return {
      error      : undefined,
      source     : "",
      sourceName : "Select a source file to load"
    };
  },

  componentWillMount : function() {
    DnaLoaderStore.addChangeListener(this._onDataChange);
  },

  componentWillUnmount : function() {
    DnaLoaderStore.removeChangeListener(this._onDataChange);
  },

  render : function() {
    return (
      <div className="card-panel">
        <div className="row">
          <div className="col s6">
            <h4>{this.state.sourceName}</h4>
            <div className="card-panel">
              <pre><code>{this.state.source}</code></pre>
            </div>
          </div>
          <div className="col s6">
            <p>{this.state.error}</p>
          </div>
        </div>
        <div className="row">
          <label htmlFor="picker" className="my-custom-file-upload waves-effect waves-light btn blue black-text">
            Choose File
            <input type="file" id="picker" onChange={this._onFileChange}></input>
          </label>
        </div>
      </div>
    );
  },

  _onFileChange : function(e) {
    DnaLoaderActionCreators.parseDna(e.nativeEvent.srcElement.files[0]);
  },

  _onDataChange : function() {
    this.setState({
      error      : DnaLoaderStore.getError(),
      source     : DnaLoaderStore.getSource(),
      sourceName : DnaLoaderStore.getSourceName()
    });
  }
});

