var React        = require('react'),
    SpeciesStore = require('../stores/SpeciesStore.js'),
    Router       = require('react-router'),
    Link         = Router.Link,
    mui          = require('material-ui'),
    Card         = mui.Card,
    CardText     = mui.CardText,
    CardTitle    = mui.CardTitle,
    List         = mui.List,
    ListItem     = mui.ListItem,
    RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  contextTypes : {
    router : React.PropTypes.func
  },

  getInitialState : function() {
    var name = this.context.router.getCurrentParams().speciesName;
    var species = SpeciesStore.getSpeciesMap().get(name);
    if (species === undefined) {
      this.context.router.transitionTo("speciesLoader");
    }

    return {
      name    : name,
      source  : species.get("source"),
      cmd     : species.get("cmd"),
      sysvars : {}
    };
  },

  componentWillReceiveProps : function() {
    var name = this.context.router.getCurrentParams().speciesName;
    var species = SpeciesStore.getSpeciesMap().get(name);
    if (species === undefined) {
      this.context.router.transitionTo("speciesLoader");
      return;
    }

    this.setState({
      name    : name,
      source  : species.get("source"),
      cmd     : species.get("cmd"),
      sysvars : {}
    });
  },

  render : function() {
    var sysvars    = this.state.sysvars;
    var sysvarList = Object.getOwnPropertyNames(sysvars).map(function(name) {
      var primaryText = name + " : " + sysvars[name];
      return <ListItem key={name} primaryText={primaryText} />;
    });

    return (
      <Card>
        <CardTitle title={this.state.name} />
        <CardText>
          <div className="section group">
            <div className="col span_6_of_12">
              <Card>
                <CardTitle title="Source"/>
                <CardText>
                  <RaisedButton primary={true} label="Run Dna" onClick={this._runDna} />
                </CardText>
                <CardText>
                  <pre>
                  {this.state.source}
                  </pre>
                </CardText>
              </Card>
            </div>

            <div className="col span_6_of_12">
              <Card>
                <CardTitle title="Sysvars" />
                <CardText>
                  <List>{sysvarList}</List>
                </CardText>
              </Card>
            </div>
          </div>
        </CardText>
        <CardText>
          <Link to="speciesLoader">Back to species list</Link>
        </CardText>
      </Card>
    );
  },

  _runDna : function() {
    var sysvars = this.state.sysvars;
    this.state.cmd(sysvars);

    this.setState({
      sysvars : sysvars
    });
  }
});
