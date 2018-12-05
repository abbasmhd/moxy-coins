import React, { Component } from 'react';
import AllCoinsList from './Components/AllCoins/AllCoinsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="container">
        <header className="App-header">
          All Coins List
        </header>
        <AllCoinsList /> 
      </div>
    );
  }


}

export default App;
