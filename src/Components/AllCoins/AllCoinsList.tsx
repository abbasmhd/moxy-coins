import React, { Component } from 'react'
import AllCoinsDbStore from '../../dbStores/AllCoinsDbStore';
import { CoinItem } from '../../Contracts/coins';
import AllCoinsItem from './AllCoinsItem';

export default class AllCoinsList extends Component {
    state = {
        coins: new Array<CoinItem>(),
        displayed: new Array<CoinItem>()
    };

    render() {
        return (
            <div>
                {this.state.displayed.map(coin => <AllCoinsItem className="coin-list" key={coin.Id} coin={coin} />)}
                <div><button className="btn btn-info" onClick={(e) => this.loadMore(e)}>Load more...</button></div>
            </div>
        )
    }
    private loadMore(e: any): void {
        e.preventDefault();
        let { coins } = this.state;
        this.setDisplayedCoins(coins)
    }

    componentWillMount() {
        this.getCoins().then((coins) => {
            this.setState({ coins })
            this.setDisplayedCoins(coins)
        });
    }

    async getCoins() {
        var db = new AllCoinsDbStore();
        return await db.getCoinList();
    }

    private setDisplayedCoins(coins: Array<CoinItem>) {
        let start = this.state.displayed.length;
        let stop = start + 21;
        this.setState({ displayed: [...this.state.displayed, ...coins.slice(start, stop)] })

    }

}