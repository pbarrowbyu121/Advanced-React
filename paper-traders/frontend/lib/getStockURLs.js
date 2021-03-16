import { useEffect, useState } from "react";
import { TSLA_response, AMZN_response, AAPL_response } from "./dummyData";
import {
  sortOrders,
  earliestDate,
  uniqueTickers,
  getUnixCode,
  fetchStockData,
  createFetchURL,
} from "./portfolioFunctions";

// Takes orders from user and gets data from API
export default function getStockData(userPortfolios) {
  console.log("userPortfolios from getStockData", userPortfolios);
  let uniqueTickersArr = [];
  let datesArray = [];
  let urlArr = [];

  // get list of unique Tickers and list of dates
  userPortfolios.forEach((portfolio) => {
    if (portfolio.orders.length > 0) {
      uniqueTickersArr = [...uniqueTickersArr, ...uniqueTickers(portfolio)];
      portfolio.orders.forEach((order) => {
        datesArray.push(getUnixCode(order.date));
      });
    }
  });
  console.log("uniqueTickers", uniqueTickersArr);

  let beg_date = Math.min(...datesArray);
  let end_date = Date.parse(new Date());
  console.log("beg_date", beg_date);
  console.log("end_date", end_date);

  // create array of urls to be fetched for each stock in portfolio
  uniqueTickersArr.forEach((symbol) =>
    urlArr.push(createFetchURL(symbol, beg_date, end_date))
  );
  console.log("urlArr", urlArr);

  return urlArr;
}
