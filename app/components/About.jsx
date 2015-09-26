var React     = require('react'),
    mui       = require('material-ui'),
    Card      = mui.Card,
    CardTitle = mui.CardTitle,
    CardText  = mui.CardText,
    DemoCode  = require('./DemoCode.js');

module.exports = React.createClass({
  render : function() {
    return (
      <div>
      <Card expandable={false}>
        <CardTitle title="Welcome to DarwinBots.js" />
        <CardText>
          This is a web and mobile-first implementation of the
          popular DarwinBots game.

          Right now, the only functionality that is available is the DNA
          parser and debugger. If you are interested, navigate to the
          SpeciesLoader.

          The DarwinBots syntax has changed from the original!
          Here is some example code:
        </CardText>
        <CardText>
          <pre>
            {DemoCode.source}
          </pre>
        </CardText>
        <CardText>
          Copy this into your favorite text-editor, save it, and you can
          upload it to see how the compiler and debugger work!

          More information can be found on
          <a href="https://github.com/BradLyman/DarwinBots.js"> my github page</a>.
        </CardText>
      </Card>
      </div>
    );
  }
});
