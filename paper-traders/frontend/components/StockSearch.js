import { timeHours } from "d3";
import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import ChartTimeFilter from "./ChartTimeFilter";
import SearchParam from "./SearchParam";
import Form from "./styles/Form";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import NewWatchListItem from "./NewWatchlistItem";
import { createFetchURL } from "../lib/portfolioFunctions";
import { CURRENT_USER_QUERY, useUser } from "./User";
import StockSearchStyle from "./styles/StockSearchStyle";

// const API_key = process.env.API_KEY;
const API_key = "O1F92HXG7p_OFdN7G7RZsaTZd_Or7pEi";

// values for chart filter
const timeLineValues = {
  week: 5,
  month: 21,
  year: 252,
};

const NEW_WATCHLIST_MUTATION = gql`
  mutation NEW_WATCHLIST_MUTATION($symbol: String!, $userId: ID!) {
    createWatchlist(
      data: { symbol: $symbol, user: { connect: { id: $userId } } }
    ) {
      id
    }
  }
`;

// optimistic promise to update the cache
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.createWatchlist));
}

export default function StockSearch() {
  const user = useUser();
  if (!user) return null;
  const [tickerState, setTickerState] = useState("");
  const [stockData, setStockData] = useState(null);

  // set filter for chart function
  const [timeLineState, setTimeLineState] = useState(21);

  const { inputs, clearForm } = useForm({
    symbol: tickerState,
    userId: user.id,
  });

  const [createWatchlist, { loading, error, data }] = useMutation(
    NEW_WATCHLIST_MUTATION,
    {
      variables: inputs,
      update,

      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

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

    // fetch the api data
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setStockData(json.results);
      });
  }

  function extraRows() {
    // console.log("extraRows", [...Array(num).keys()]);
    console.log("extra rows called");
    [...Array(5).keys()].map((index) => (
      <div class="page-row" key={index}>
        <div class="page-margin"></div>
        <div class="righthand-side">extra row</div>
      </div>
    ));
  }

  return (
    <div>
      <StockSearchStyle id="stocksearch">
        <div class="notebook-top"></div>
        <div class="page-head">
          <div class="page-margin"></div>
          <h1>Stock Search</h1>
        </div>
        <div class="page-row search-param">
          <div class="page-margin"></div>
          <label htmlFor="ticker">
            Symbol
            <input
              id="ticker"
              name="ticker"
              placeholder="XXXX"
              onChange={(e) => setTickerState(e.target.value)}
            ></input>
          </label>
        </div>
        <div class="page-row">
          <div class="page-margin"></div>
          <div class="righthand-side">
            <button onClick={handleGetData}>See Stock Performance</button>
            <button
              onClick={async (e) => {
                e.preventDefault();
                const res = await createWatchlist();
                clearForm();
                inputs.userId = user.id;
              }}
            >
              Add to Watchlist
            </button>
          </div>
        </div>

        {stockDataForChart && (
          <div class="page-row">
            <div class="page-margin"></div>
            <div class="righthand-side">
              <div id="appendChart"></div>
            </div>
          </div>
        )}
        {stockDataForChart && (
          <div class="page-row">
            <div class="page-margin"></div>
            <div class="righthand-side chart-title">
              {tickerState} Performance, {timeLineState}
            </div>
          </div>
        )}
        {/* blank rows */}
        {[...Array(13).keys()].map((index) => (
          <div class="page-row" key={index}>
            <div class="page-margin"></div>
            <div class="righthand-side"></div>
          </div>
        ))}
        {stockDataForChart && (
          <div class="page-row">
            <div class="page-margin"></div>
            <div class="righthand-side chart-filter-row">
              <ChartTimeFilter
                handler={handleChartFilterChange}
                checkedValue={timeLineState}
              />
            </div>
          </div>
        )}
        {[...Array(2).keys()].map((index) => (
          <div class="page-row" key={index}>
            <div class="page-margin"></div>
            <div class="righthand-side"></div>
          </div>
        ))}
      </StockSearchStyle>

      {/* <NewWatchListItem /> */}
      {stockData && <Chart data={stockDataForChart} />}
    </div>
  );
}
