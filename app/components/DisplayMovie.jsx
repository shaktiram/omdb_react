import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import { Image,Col } from 'react-bootstrap';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
export default class DisplayMovie extends React.Component{
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  /**
   * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
   * through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.
   */
  render(){
    return (
      <Col md={2} sm={12}>
        <section>
          <Image src={this.props.movie['Poster']} responsive/>
          <h5>Title: {this.props.movie['Title']}</h5>
        </section>
      </Col>
    );
  }
}

DisplayMovie.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
