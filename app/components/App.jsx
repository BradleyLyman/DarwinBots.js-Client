var React       = require('react'),
    ReactRouter = require('react-router'),
    History     = ReactRouter.History,
    State       = ReactRouter.State,
    Theme       = require('./Theme.js'),
    AppBar      = require('material-ui/lib/app-bar'),
    MenuItem    = require('material-ui/lib/menus/menu-item'),
    IconMenu    = require('material-ui/lib/menus/icon-menu'),
    IconButton  = require('material-ui/lib/icon-button'),
    Paper       = require('material-ui/lib/paper');

var App = React.createClass({
  mixins : [History, State],

  childContextTypes : {
    muiTheme : React.PropTypes.object
  },

  getChildContext : function() {
    return {
      muiTheme : Theme
    };
  },

  onNavMenuChange : function(e, value) {
    this.history.pushState(null, '/' + value);
  },

  render : function() {
    var menuButton = (
      <IconButton iconClassName="material-icons">menu</IconButton>
    );

    var iconMenu = (
      <IconMenu
        iconButtonElement={menuButton}
        openDirection="bottom-right"
        onChange={this.onNavMenuChange}>
        <MenuItem primaryText="About" value="about"/>
        <MenuItem primaryText="Upload Species" value="upload species"/>
      </IconMenu>
    );

    return (
      <div>
        <AppBar
          title={'DarwinBots.js: ' + this.props.location.pathname.slice(1)}
          iconElementLeft={iconMenu} />

        <Paper>
          {this.props.children}
        </Paper>
      </div>
    );
  }
});

module.exports = App;
