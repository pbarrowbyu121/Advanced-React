import { timeHours } from "d3";
import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import ChartTimeFilter from "./ChartTimeFilter";
import SearchParam from "./SearchParam";
import Form from "./styles/Form";
import { useState, useEffect, useContext } from "react";
import NewWatchListItem from "./NewWatchlistItem";
import { createFetchURL } from "../lib/portfolioFunctions";

// const API_key = process.env.API_KEY;
const API_key = "O1F92HXG7p_OFdN7G7RZsaTZd_Or7pEi";

// values for chart filter
const timeLineValues = {
  week: 5,
  month: 21,
  year: 252,
};

export default function StockSearch() {
  const [tickerState, setTickerState] = useState("");
  const [stockData, setStockData] = useState(null);

  // set filter for chart function
  const [timeLineState, setTimeLineState] = useState(21);

  let dayNum;
  let monthNum;
  const today = new Date();

  let stockDataForChart;

  if (stockData) {
    // determine how many items to include in chart based on radio buttons
    let sliceAmount =
      timeLineState === "ALL"
        ? stockData.length
        : Math.min(timeLineState, stockData.length);

    // filter performance data for last n items, n is the number from radio button filter
    stockDataForChart = stockData.slice(
      Math.max(stockData.length - sliceAmount, 0)
    );
  }

  function handleChartFilterChange(e) {
    let { name, value, type } = e.target;
    setTimeLineState(e.target.value);
  }

  function handleGetData(event) {
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

    let url = createFetchURL(tickerState, beg_date, end_date);

    // let url =
    //   "https://api.polygon.io/v2/aggs/ticker/" +
    //   tickerState +
    //   "/range/1/day/" +
    //   beg_date +
    //   "/" +
    //   end_date +
    //   "?apiKey=" +
    //   API_key;

    // console.log(url);

    // fetch the api data
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setStockData(json.results);
      });
  }

  return (
    <div>
      {/* <Form> */}
      <h1>Stock Search</h1>
      <SearchParam
        fieldName="Symbol"
        name="ticker"
        placeholder="XXXX"
        onChange={(e) => setTickerState(e.target.value)}
      />
      <button onClick={handleGetData}>See Stock Performance</button>
      <ChartTimeFilter
        handler={handleChartFilterChange}
        checkedValue={timeLineState}
      />
      <NewWatchListItem />
      {stockData && <Chart data={stockDataForChart} />}

      {/* </Form> */}
    </div>
  );
}
