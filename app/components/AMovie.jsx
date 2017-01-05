import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import { Image,Col,Row } from 'react-bootstrap';
import {Link} from 'react-router';
import Axios from 'axios';
import Header from './Header.jsx';

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
    Axios.get('http://www.omdbapi.com/?i=' + this.props.params.title + '')
         .then((result) => {
           this.setState({
             movie: result['data'],
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
                  <h5>IMDB Score: {this.state.movie['imdbRating']}</h5>
                  <h5>Year: {this.state.movie['Year']}</h5>
                  <h5>Director: {this.state.movie['Director']}</h5>
                  <p>Plot: {this.state.movie['Plot']}</p>
                </section>
              </Col>
    }else{
      content = null;
    }
    return (
      <div>
        <Header/>
        {content}
        <Row>
          <FlatButton label="Go Back" />
        </Row>
      </div>
    );
  }
}

AMovie.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
