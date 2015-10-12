var React       = require('react'),
    ReactRouter = require('react-router'),
    Router      = ReactRouter.Router,
    Route       = ReactRouter.Route;

var App           = require('./components/App.jsx'),
    NoMatch       = require('./components/NoMatch.jsx'),
    About         = require('./components/About.jsx'),
    NewSimulation = require('./components/newSimulation/NewSimulation.jsx'),
    Simulation    = require('./components/Simulation.jsx');

module.exports = (
  <Router>
    <Route component={App}>
      <Route path="/"              component={About} />
      <Route path="about"          component={About} />
      <Route path="new_simulation" component={NewSimulation} />
      <Route path="simulation"     component={Simulation} />
      <Route path="*"              component={NoMatch} />
    </Route>
  </Router>
);
