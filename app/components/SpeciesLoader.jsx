var React                       = require('react'),
    SpeciesLoaderStore          = require('../stores/SpeciesLoaderStore.js'),
    SpeciesLoaderActionCreators = require('../actions/SpeciesLoaderActionCreators.js');

module.exports = React.createClass({
  getInitialState : function() {
    return {
      speciesMap : SpeciesLoaderStore.getSpeciesMap(),
      error      : SpeciesLoaderStore.getError()
    };
  },

  componentWillMount : function() {
    SpeciesLoaderStore.addChangeListener(this._onSpeciesLoaderChange);
  },

  componentWillUnmount : function() {
    SpeciesLoaderStore.removeChangeListener(this._onSpeciesLoaderChange);
  },

  render : function() {
    var speciesDisplay = this.state.speciesMap.map(function(species, name) {
      return (<li key={name} className="collection-item">{name}</li>);
    }).toList();

    return (
      <div className="container">
        <div className="card-panel">
          <h4>Available Species</h4>

          <ul className="collection">{speciesDisplay}</ul>

          <h5 className="indigo-text">{this.state.error}</h5>
          <label htmlFor="picker" className="my-file-picker waves-effect waves-light btn indigo">
            Choose File
            <input type="file" id="picker" style={{ display: 'none' }} onChange={this._onFileChange}></input>
          </label>
        </div>
      </div>
    );
  },

  _onSpeciesLoaderChange : function() {
    this.setState({
      speciesMap : SpeciesLoaderStore.getSpeciesMap(),
      error      : SpeciesLoaderStore.getError()
    });
  },

  _onFileChange : function(e) {
    SpeciesLoaderActionCreators.loadSpecies(e.nativeEvent.srcElement.files[0]);
    e.nativeEvent.srcElement.value = "";
  }
});

