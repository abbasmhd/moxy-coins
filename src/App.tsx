import React, { Component } from 'react';
import DbStore from './Service/DbStore';
import './App.css';





class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        test 123
        </header>
      </div>
    );
  }

  componentDidMount(){
    this.getCoins();
  }

  async getCoins(){
    var db = new DbStore();
    var list = await db.getCoinList();
    console.info("REUSLTS");
    //list.forEach((coin:any) => console.info(coin))
    console.info(list);
  }
}

export default App;
