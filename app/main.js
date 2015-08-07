(function() {
  var React                = require('react'),
      Router               = require('react-router'),
      injectTapEventPlugin = require('react-tap-event-plugin'),
      App                  = require('./components/App.jsx'),
      About                = require('./components/About.jsx'),
      Route                = Router.Route;

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="about" handler={About} />
    </Route>
  );

  injectTapEventPlugin();

  Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body);
  });
}());
