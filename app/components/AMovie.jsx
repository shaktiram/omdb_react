import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import { Image,Col } from 'react-bootstrap';
import {Link} from 'react-router';
import Axios from 'axios';
import Header from './Header.jsx';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

let imageStyle = {
  width: "250px",
  height: "400px",
}
export default class AMovie extends React.Component{
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  constructor(props) {
    super(props);
    this.state = {
      movie : null,
      display: false
    }
    Axios.get('http://www.omdbapi.com/?s=' + this.props.params.title + '')
         .then((result) => {
           let movieList = result['data']['Search'];
           this.setState({
             movie: movieList[0],
             display: true
           });
         })
  }

  callApi(){
    conosle.log('here');
  }

  /**
   * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
   * through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.
   */
  render(){
    let isDisplay = this.state.display;
    let content = null;
    if(isDisplay){
      content = <Col xs={12} md={8} mdOffset={3}>
                <section>
                  <Image style={imageStyle} src={this.state.movie['Poster']} responsive/>
                  <h5>Title: {this.state.movie['Title']}</h5>
                  <h5>IMDB ID: {this.state.movie['imdbID']}</h5>
                  <h5>Year: {this.state.movie['Year']}</h5>
                </section>
              </Col>
    }else{
      content = null;
    }
    return (
      <div>
        <Header/>
        {content}
      </div>
    );
  }
}

AMovie.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
