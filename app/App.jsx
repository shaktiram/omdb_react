import React from 'react';
import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//export default () => <h1>Hello World!!!</h1>;


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <Search/>
      </div>
    );
  }
}
