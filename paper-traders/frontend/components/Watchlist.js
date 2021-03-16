import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import WatchlistItem from "./WatchlistItem";
import { createFetchURL } from "../lib/portfolioFunctions";
import {
  TSLA_response,
  AMZN_response,
  AAPL_response,
  RDFN_response,
} from "../lib/dummyData";
import WatchlistStyles from "./styles/WatchlistStyles";
import { gray } from "d3";

let dummyData = [TSLA_response, AMZN_response, AAPL_response, RDFN_response];

export default function Watchlist() {
  const userState = useContext(UserContext);

  const [stockData, setStockData] = useState(null);

  let urlArr = [];

  let dayNum;
  let monthNum;

  const today = new Date();
  if (today.getDate() < 10) {
    dayNum = "0" + today.getDate();
  } else {
    dayNum = today.getDate();
  }

  if (today.getMonth() + 1 < 10) {
    monthNum = "0" + (today.getMonth() + 1);
  } else {
    monthNum = today.getMonth();
  }

  let end_date = today.getFullYear() + "-" + monthNum + "-" + dayNum;
  let beg_date = today.getFullYear() - 2 + "-" + monthNum + "-" + dayNum;

  useEffect(() => {
    if (userState) {
      let watchlist = userState.watchlist;

      // create array of urls to be fetched for each stock in portfolio
      watchlist.forEach((item) =>
        urlArr.push(createFetchURL(item.symbol, beg_date, end_date))
      );

      // returns each fetched data
      //   Promise.all(
      //     urlArr.map((url) => fetch(url).catch((err) => console.log(err)))
      //   )
      //     .then((responses) => Promise.all(responses.map((res) => res.json())))
      //     .then((response) => {
      //       setStockData(response);
      //     });
      setStockData(dummyData);
    }
  }, [userState]);

  //   console.log("userState", userState);

  if (userState === undefined || userState === null || stockData === null)
    return <p>Watchlist will go here</p>;

  return (
    <WatchlistStyles>
      <div
        class="notebook_top"
        style={{ background: "gray", height: "3rem" }}
      ></div>
      <div class="page_head">
        <div class="page_margin"></div>
        <h1>Watchlist</h1>
      </div>

      <div class="watchlist">
        {userState &&
          stockData.map((stockDatum) => (
            <WatchlistItem key={stockDatum.ticker} data={stockDatum} />
          ))}
      </div>
    </WatchlistStyles>
  );
}
