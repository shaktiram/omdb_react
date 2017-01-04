import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
export default class Header extends React.Component{
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  /**
   * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
   * through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.
   */
  render(){
    return (
      <AppBar
        title="OMDB"
        iconElementRight= {<FlatButton label="Profile" />}
      />
    );
  }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
