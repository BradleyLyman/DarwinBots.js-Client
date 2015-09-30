var Colors           = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing          = require('material-ui/lib/styles/spacing');
var ThemeManager     = require('material-ui/lib/styles/theme-manager');

var palette = {
  primary1Color      : Colors.blue500,
  primary2Color      : Colors.blue700,
  primary3Color      : Colors.lightBlack,
  accent1Color       : Colors.pinkA200,
  accent2Color       : Colors.grey100,
  accent3Color       : Colors.grey500,
  textColor          : Colors.darkBlack,
  alternateTextColor : Colors.white,
  borderColor        : Colors.grey300,
  disabledColor      : ColorManipulator.fade(Colors.darkBlack, 0.3),
};

var manager = new ThemeManager();
manager.setPalette(palette);
module.exports = manager.getCurrentTheme();
