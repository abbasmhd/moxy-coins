import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import { CoinItem } from "../../Contracts/coins";

interface CoinItemProps {
  coin: CoinItem;
}

interface CoinItemState {
  coin: CoinItem;
}

export default class AllCoinsItem extends Component<CoinItemProps, CoinItemState> {
  constructor(props: CoinItemProps) {
    super(props);
    this.state = { coin: props.coin };
  }
  render() {
    let { coin } = this.state;
    return (
      <div className="card" style={{ width: "18rem", display: "inline-block", marginRight: 4 }}>
        <LazyLoad height={100} once>
          <img
            className="card-img-top center-image"
            src={`${process.env.REACT_APP_IMAGE_URL}${coin.ImageUrl}`}
            alt={coin.FullName}
          />
        </LazyLoad>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "1vw", whiteSpace: "nowrap" }}>
            {coin.FullName}
          </h5>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          <a href="#" className="btn btn-outline-info btn-sm">
            Details...
          </a>
        </div>
      </div>
    );
  }
}
