var React         = require('react'),
    Director      = require('director'),
    TitleBar      = require('./titlebar/TitleBar.jsx'),
    About         = require('./About.jsx'),
    SpeciesLoader = require('./SpeciesLoader.jsx'),
    _router;

module.exports = React.createClass({
  getInitialState : function() {
    return { route : "about" };
  },

  componentWillMount : function() {
    var routes = {
      '/'              : this._about,
      '/about'         : this._about,
      '/speciesLoader' : this._speciesLoader
    };

    _router = new Director.Router(routes);
    _router.init();
  },

  render : function() {
    var page;
    switch (this.state.route) {
      case "about":
        page = <About />;
        break;

      case "speciesLoader":
        page = <SpeciesLoader />;
        break;

      default:
        page = <About />;
        break;
    }

    return (
      <div>
        <TitleBar />
        {page}
      </div>
    );
  },

  _about : function() {
    this.setState({ route : "about" });
  },

  _speciesLoader : function() {
    this.setState({ route : "speciesLoader" });
  }
});
