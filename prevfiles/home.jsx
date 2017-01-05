import React from 'react';
import Request from 'superagent';
import _ from 'lodash';

class home extends React.components
{
  constructor(){
  super();
  this.state= {};
  }

  componentWillMount(){
  this.search();
  }


updateSearch(){
this.search(this.refs.query.value);
}

  render(){
  var movies=_.map(this.state.movies,(movie)=>{
  return <li>{movie.Title}</li>;
  });
  return <div>
  <input ref='query' onChange={ (e)=>{this.updateSearch();}} type='text' />
  <ul>{movies}</ul>
  <div>;
  }





    search(query= "star"){
     url='http://www.omdbapi.com?s=${query}&y=&r=json&plot=short';
     Request.get(url).then((response) =>{
     this.setState({
     movies: response.body.Search,
     total:response.body.totalResults
  });
  });
  }
}
export {home as default};
