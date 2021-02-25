import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { TSLA_response, AMZN_response } from "./dummyData";
import {
  uniqueTickers,
  earliestDate,
  attachTicker,
  getUniqueDates,
} from "./portfolioFunctions";
import { buildPortfolioData } from "./buildPortfolioData";
import { calculatePerformance } from "./calculatePerformance";
import { getStockData } from "./getStockData";

// function to
// INPUTS: Portfolio object from database:
// {
//     __typename: 'Portfolio',
//     id: ID
//     name: String
//     orders: Array
// }
// RETURNS: copy of Portfolio object but with performance field:
// {
//     id: ID
//     name: String
//     orders: Array
//     performance: Array of objects:
//     {
//         summary: Object: {
//             stock: Int, stock assets at the end of the day
//             cash: Int, cash assets at the end of the day
//             total: Int, stock + cash
//         }
//         date: unix code
//         orders: Array of orders for the day
//         stocks: Array of stock performance for the day
//     }
// }
// DEPENDENCIES: uniqueTickers, earliestDate, attachTicker, getUniqueDates,
// buildPortfolioData, calculatePerformance
// STEPS:
// 1. gets data from API for each ticker in portfolio
// 2. attach ticker to each stock data fetched
// 3. get unique dates in portfolio
// 4. build "shell" for portfolio with buildPortfolioData
// 5. Populate the summary object of each day in performance with calculatePerformance
export function getPortfolioPerformance(portfolio = []) {
  console.log("getPerformance input", portfolio);
  console.log("getPerformance input orders", portfolio.orders.length);
  // trying to use hooks to store response in state
  const [response, setResponse] = useState([]);
  const portfolioValues = Object.values(portfolio).join("");

  // update state each time input "portfolio" changes
  // test update of state with dummy data
  //   useEffect(() => {
  console.log("useEffect called", portfolio);
  // if no portfolio passed return object with blank performance
  if (portfolio.orders.length === 0) {
    console.log("no portfolio or orders", portfolio.name);
    return {
      id: portfolio.id,
      name: portfolio.name,
      orders: portfolio.orders,
      performance: [],
    };
  }

  let stockResponse = getStockData(portfolio);
  //   setResponse([TSLA_response, AMZN_response]);
  //   console.log("response", portfolio.name, response);

  // get unique tickers
  let uniqueTickersArray = uniqueTickers(portfolio);

  // get earliest and latest dates
  let beg_date = Date.parse(earliestDate(portfolio));
  //   let end_date = Date.parse(new Date("01/31/2021"));
  let end_date = Date.parse(new Date());

  //   // get ticker data from API
  //   let stockAPIData = uniqueTickersArray.map((ticker) => {
  //     fetchStockData(ticker, beg_date, end_date);
  //   });

  //   //   update state if portfolio activity changes
  //   useEffect(() => {
  //     // returns each fetched data
  //     console.log("Use Effect called");
  //     Promise.all(stockAPIData)
  //       .then((responses) => {
  //         return responses.map((r) => r);
  //       })
  //       // sets response to state
  //       .then((res) => setResponse(res));
  //   }, [portfolio]);

  //   // test update of state with dummy data
  //   useEffect(() => {
  //     // console.log("Use Effect called");
  //     setResponse([TSLA_response, AMZN_response]);
  //   }, [portfolio]);

  // attach ticker to each daily result
  //   response.map((response) => attachTicker(response));
  stockResponse.map((response) => attachTicker(response));
  let stockData = [];
  stockResponse.forEach((response) => {
    stockData = [...stockData, ...response.results];
    // console.log("stockData", stockData);
  });

  let uniqueDates = getUniqueDates(stockData);
  console.log("stock data here1", stockData);

  // Sets up Portfolio shell by day and puts in each stock data for each day
  let portfolioData = buildPortfolioData(
    uniqueDates,
    uniqueTickersArray,
    stockData,
    portfolio.orders
  );
  //   console.log("stock data herezzz", stockData);

  let portfolioPerformance = calculatePerformance(
    uniqueTickersArray,
    portfolioData
  );

  let objSummary = {
    id: portfolio.id,
    name: portfolio.name,
    orders: portfolio.orders,
    performance: portfolioPerformance,
  };

  console.log("getPortfolioPerformance return", objSummary);
  return objSummary;
  //   }, [portfolioValues]);
}
