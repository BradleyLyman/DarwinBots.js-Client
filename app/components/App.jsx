var Router       = require('react-router'),
    React        = require('react'),
    RouteHandler = Router.RouteHandler,
    mui          = require('material-ui'),
    Colors       = mui.Styles.Colors,
    ThemeManager = new mui.Styles.ThemeManager(),
    AppBar       = mui.AppBar,
    LeftNav      = mui.LeftNav;

var theme = {
  getPalette : function() {
    return {
      primary1Color: Colors.blueGrey500,
      primary2Color: Colors.blueGrey700,
      primary3Color: Colors.blueGrey100,
      accent1Color: Colors.indigoA200,
      accent2Color: Colors.indigoA400,
      accent3Color: Colors.indigoA100,
    };
  },

  getComponentThemes : function() {
    return {};
  }
};
ThemeManager.setTheme(theme);

module.exports = React.createClass({
  contextTypes : {
    router : React.PropTypes.func
  },

  childContextTypes : {
    muiTheme : React.PropTypes.object
  },

  getChildContext : function() {
    return {
      muiTheme : ThemeManager.getCurrentTheme()
    };
  },

  menuItems : function() {
    return [
      { text : 'About', route : 'about' },
      { text : 'Species Loader', route : 'speciesLoader' }
    ];
  },

  render : function() {
    var appBar = (
      <AppBar
        title="DarwinBots.js"
        iconClassnameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this._onLeftButtonTouchTap} />
    );

    return (
      <div>
        {appBar}

        <LeftNav
          ref="leftNav"
          menuItems={this.menuItems()}
          docked={false}
          header={appBar}
          onChange={this._onNavBarChange}/>

        <RouteHandler />
      </div>
    );
  },

  _onLeftButtonTouchTap : function() {
    this.refs.leftNav.toggle();
  },

  _onNavBarChange : function(event, index, payload) {
    this.context.router.transitionTo(payload.route);
  }

});









