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
      species : species,
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
      species : species,
      sysvars : {}
    });
  },

  render : function() {
    var sysvars    = this.state.sysvars;
    var sysvarList = Object.getOwnPropertyNames(sysvars).map(function(name) {
      var primaryText = name + " : " + sysvars[name];
      return <ListItem key={name} primaryText={primaryText} />;
    });

    var errText;

    if (this.state.species.error !== undefined) {
      errText = (
        <CardText>
          <pre>
            {this.state.species.error}
          </pre>
          <hr />
        </CardText>
      );
    }

    var srcCard = (
      <Card>
        <CardTitle title={this.state.species.name}/>
        {errText}
        <CardText>
          <pre>
          {this.state.species.rawSource}
          </pre>
        </CardText>
      </Card>
    );

    var runDna;

    if (this.state.species.error === undefined) {
      runDna = (
        <CardText>
          <RaisedButton primary={true} label="Run Dna" onClick={this._runDna} />
        </CardText>
      );
    }

    return (
      <div>
        <div className="section group">
          <div className="col span_6_of_12">
            {srcCard}
          </div>

          <div className="col span_6_of_12">
            <Card>
              <CardTitle title="Sysvars" />
              {runDna}
              <CardText>
                <List>{sysvarList}</List>
              </CardText>
            </Card>
          </div>
        </div>

        <Link to="speciesLoader" style={{ paddingBottom : '20px' }}>Back to species list</Link>
      </div>
    );
  },

  _runDna : function() {
    var sysvars = this.state.sysvars;
    this.state.species.dnaCmd(sysvars);

    this.setState({
      sysvars : sysvars
    });
  }
});
