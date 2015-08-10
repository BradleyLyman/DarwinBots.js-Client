var React        = require('react'),
    SpeciesStore = require('../stores/SpeciesStore.js'),
    Router       = require('react-router'),
    Link         = Router.Link,
    mui          = require('material-ui'),
    Card         = mui.Card,
    CardText     = mui.CardText,
    CardTitle    = mui.CardTitle;

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
      name : name,
      source : species.get("source")
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
      name   : name,
      source : species.get("source")
    });
  },

  render : function() {
    return (
      <Card>
        <CardTitle title={this.state.name} />
        <CardText>
          <div className="section group">
            <div className="col span_6_of_12">
              <Card>
                <CardTitle title="Source"/>
                <CardText>
                  <pre>
                  {this.state.source}
                  </pre>
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
  }
});
