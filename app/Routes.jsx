var React       = require('react'),
    ReactRouter = require('react-router'),
    Router      = ReactRouter.Router,
    Route       = ReactRouter.Route;

var App             = require('./components/App.jsx'),
    NoMatch         = require('./components/NoMatch.jsx'),
    About           = require('./components/About.jsx'),
    SpeciesLoader   = require('./components/speciesLoader/SpeciesLoader.jsx');

module.exports = (
  <Router>
    <Route component={App}>
      <Route path="/"              component={About} />
      <Route path="about"          component={About} />
      <Route path="upload species" component={SpeciesLoader}/>
      <Route path="*"              component={NoMatch} />
    </Route>
  </Router>
);
