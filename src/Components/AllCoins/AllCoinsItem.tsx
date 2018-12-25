import React from "react";
import LazyLoad from "react-lazyload";
import { CoinItem } from "../../Contracts/coins";

export default function AllCoinsItem({ coin }: { coin: CoinItem }) {
  return (
    <div className="card" style={{ width: "16rem", display: "inline-block", marginRight: 4 }}>
      <span className="badge badge-pill badge-secondary" style={{ marginLeft: 4 }}>
        {coin.SortOrder}
      </span>
      <LazyLoad height={200} once>
        <img
          className="card-img-top center-image"
          src={`${process.env.REACT_APP_IMAGE_URL}${coin.ImageUrl}`}
          alt={coin.FullName}
        />
      </LazyLoad>
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1vw", whiteSpace: "nowrap" }}>
          {coin.Symbol}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{coin.CoinName}</h6>
        {/* <p className="card-text"></p> */}
        <a href="#" className="btn btn-outline-info btn-sm">
          Details...
        </a>
      </div>
    </div>
  );
}
