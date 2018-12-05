import React from 'react'
import { CoinItem } from '../../Contracts/coins';

export default function AllCoinsItem(props: any) {
  let coin: CoinItem = props.coin;
  return (
    <div className="card" style={{width: "18rem", display: "inline-block", marginRight: 4}}>
      <img className="card-img-top center-image" src={"https://www.cryptocompare.com" + coin.ImageUrl} alt={coin.FullName} />
      <div className="card-body">
        <h5 className="card-title" style={{fontSize: "1vw", whiteSpace: "nowrap"}}>{coin.FullName}</h5>
        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        <a href="#" className="btn btn-primary">Details...</a>
      </div>
    </div>
  )
}


    /*
    
    <ul className="coin-item">
        <li>{coin.SortOrder}</li>
        <li><img src={"https://www.cryptocompare.com" + coin.ImageUrl} alt={coin.FullName} /></li>
        <li>{coin.FullName}</li>
        <li>{coin.TotalCoinSupply}</li>
        <li>{coin.IsTrading}</li>
        <li>{coin.TotalCoinsMined}</li>
      </ul>
      */

