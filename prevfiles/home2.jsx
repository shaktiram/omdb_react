import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ajax from 'superagent';
import { Pagination,Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';const style = {
 margin: 12,
};class SearchBar extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
   mList:null,
   value: '',
   items:0,
   search:false,
   currentPage:1
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.ajaxCall=this.ajaxCall.bind(this);
 }  handleChange(event) {
   this.setState({value: event.target.value});
 } ajaxCall()
{
let url="http://www.omdbapi.com/?s="+this.state.value+"&page="+this.state.currentPage;
ajax.get(url)
       .end((error, response) => {
           if (response) {
             console.log(response.body);
             let movies=response.body.Search;
               this.setState({
               search:true,
               mList:movies,
               items:movies.length,
               });            } else {
               console.log('There was an error fetching from API', error);
           }
       }
   ); }
 handleClick() {
 let page=this.state.currentPage;
 page++;
       this.setState({
       currentPage:page,
       });
       console.log(this.state.currentPage);
       this.ajaxCall();
 }  render() {
  let isSearch = this.state.search;
   let content = null;
   if(isSearch){
     content =
     <div>
     {this.state.mList.map((details,i) => (
                 <section>
                   <Image src={details.Poster}/>
                   <h3>Title: {details.Title}</h3>
                 </section>
               ))}
       </div>
   }else{
     content = null;
   }
   return (
   <div>
       <TextField
       hintText="Type Movie Name Here"
       value={this.state.value} onChange={this.handleChange}
      />
     <RaisedButton label="Search" primary={true} style={style} onClick={this.ajaxCall.bind(this)}/>
     <InfiniteScroll
     loadMore={this.handleClick}
     hasMore={true}
     loader={<div className="loader">Loading ...</div>}>
     {content}
     </InfiniteScroll>
       </div>
   );
 }
}export default SearchBar;
