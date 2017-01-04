import React from 'react';
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Axios from 'axios';
import { Pagination,Image,Col,Modal,Button } from 'react-bootstrap';
import Movie from './Movie.jsx';

export default class Search extends React.Component{
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  constructor(props) {
    super(props);
    this.callApi = this.callApi.bind(this);
    this.state = {
      search: false,
      value: '',
      movies: null,
      items: 0,
      activePage: 1,
      showModal: false,
      activeMovie: null
    };
  }

  handleChange(event){
    this.setState({
      value: event.target.value,
      activePage: 1
    });
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
    this.callApiPage(eventKey).bind(this);
  }

  callApiPage(page){
    Axios.get('http://www.omdbapi.com/?s=' + this.state.value + '&page=' + page)
         .then((result) => {
           let movieList = result['data']['Search'];
           this.setState({
             movies: movieList
           });
         })
  }

  callApi(){
    Axios.get('http://www.omdbapi.com/?s=' + this.state.value + '')
         .then((result) => {
           let movieList = result['data']['Search'];
           let noOfResults = result['data']['totalResults'];
           this.setState({
             search: true,
             movies: movieList,
             items : parseInt(noOfResults/10) + 1,
         });
       })
 }

  setActiveMovie(key){
    let tempMovie = this.state.movies[key];
    this.setState({
      showModal: true,
      clickedMovie: tempMovie,
    });
  }

  render() {
    let isSearch = this.state.search;
    let isShow = this.state.showModal;
    let content = null;
    let modal = null;
    if(isSearch){
      content = <div>
                  {this.state.movies.map((movie, i) => <Movie setActiveMovie={this.setActiveMovie} index = {i} movie = {movie} />)}
                  <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.state.items}
                    maxButtons={5}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)}
                    />
                </div>;
    }else{
      content = null;
    }

    return (
      <div>
        <Col xs={12} md={8} mdOffset={4}>
        <TextField
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          hintText="Enter text to search"
        />

        <FloatingActionButton onClick={this.callApi.bind(this)}>
          <SearchIcon/>
        </FloatingActionButton>
      </Col>
      <Col xs={12} md={12}>
        {content}
      </Col>
    </div>
    )
  }
}

Search.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
