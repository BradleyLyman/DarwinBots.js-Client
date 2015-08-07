var React     = require('react'),
    mui       = require('material-ui'),
    Card      = mui.Card,
    CardTitle = mui.CardTitle,
    CardText  = mui.CardText;

module.exports = React.createClass({
  render : function() {
    return (
      <div className="container section group">
        <div className="col span_1_of_12"/>

        <div className="col span_10_of_12">
          <Card expandable={false}>
            <CardTitle title="Welcome to DarwinBots.js" />
            <CardText>
              This is a web and mobile-first implementation of the
              popular DarwinBots game.
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
});
