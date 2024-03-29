import React, { Component } from "react";
import AllCoinsDbStore from "../../dbStores/AllCoinsDbStore";
import { CoinItem } from "../../Contracts/coins";
import AllCoinsItem from "./AllCoinsItem";
import ScrollButton from "../../Common/ScrollButton";

export default class AllCoinsList extends Component {
  state = {
    coins: new Array<CoinItem>(),
    displayed: new Array<CoinItem>()
  };

  render() {
    return (
      <div className="container">
        {this.state.displayed.map((coin: CoinItem) => (
          <AllCoinsItem key={coin.Id} coin={coin} />
        ))}
        <div>
          <button className="btn btn-info" onClick={(e) => this.loadMore(e)}>
            Load more...
          </button>
        </div>
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
      </div>
    );
  }
  private loadMore(e: any): void {
    e.preventDefault();
    let { coins } = this.state;
    this.setDisplayedCoins(coins);
  }

  componentWillMount(): void {
    this.getCoins().then((coins) => {
      this.setState({ coins });
      this.setDisplayedCoins(coins);
    });
  }

  async getCoins(): Promise<CoinItem[]> {
    const db: AllCoinsDbStore = new AllCoinsDbStore();
    return await db.getCoinList();
  }

  private setDisplayedCoins(coins: Array<CoinItem>) {
    let start = this.state.displayed.length;
    let stop = start + 20;
    this.setState({ displayed: [...this.state.displayed, ...coins.slice(start, stop)] });
  }
}
