'use strict';
let React = require('react');

let MUICard   = require('material-ui/lib/card'),
    Card       = MUICard.Card,
    CardHeader = MUICard.CardHeader,
    CardText   = MUICard.CardText;

let SpeciesCard = React.createClass({
  render : function() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          avatar={<div />}
          actAsExpander={true}
          showExpandableButton={true}>
          <h3 style={{ fontSize : '1.2em', }}>
            {this.props.species.name}
          </h3>
        </CardHeader>

        <CardText expandable={true}>
          <pre>
            {this.props.species.compileErr || this.props.species.rawSource}
          </pre>
        </CardText>
      </Card>
    );
  },
});

module.exports = SpeciesCard;
