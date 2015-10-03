(function() {
  var React  = require('react'),
      Routes = require('./Routes.jsx');

  require('react-tap-event-plugin')();

  require('./css/fonts/fonts.css');
  require('./css/html5reset.css');
  require('./css/main.css');

  React.render(Routes, document.body );
}());
