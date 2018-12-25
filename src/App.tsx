import React, { Component } from "react";
import AllCoinsList from "./Components/AllCoins/AllCoinsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="App-header">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
              Coins List
            </a>
          </nav>
        </header>
        <AllCoinsList />
      </div>
    );
  }
}

export default App;
