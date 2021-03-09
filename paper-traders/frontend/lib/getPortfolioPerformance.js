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

export function getPortfolioPerformance(portfolio, stockResponseArr) {
  // console.log("getPerformance input", portfolio, stockResponseArr);
  // console.log("orders length", portfolio.orders.length);

  let stockResponse = stockResponseArr;

  // if no portfolio passed return object with blank performance
  if (portfolio.orders.length === 0) {
    // console.log("no portfolio or orders", portfolio.name);
    return {
      id: portfolio.id,
      name: portfolio.name,
      orders: portfolio.orders,
      performance: [],
    };
  }

  // get unique tickers
  let uniqueTickersArray = uniqueTickers(portfolio);

  // get earliest and latest dates
  let beg_date = Date.parse(earliestDate(portfolio));
  //   let end_date = Date.parse(new Date("01/31/2021"));
  let end_date = Date.parse(new Date());

  // attach ticker to each daily result
  stockResponse.map((response) => attachTicker(response));
  let stockData = [];
  stockResponse.forEach((response) => {
    stockData = [...stockData, ...response.results];
    // console.log("stockData", stockData);
  });

  let uniqueDates = getUniqueDates(stockData);
  // console.log("stock data here", stockData);

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
  // console.log("portfolio id", portfolio.id);
  let objSummary = {
    id: portfolio.id,
    name: portfolio.name,
    orders: portfolio.orders,
    performance: portfolioPerformance,
  };
  // console.log("get portfolio performance return", objSummary);
  return objSummary;
}
