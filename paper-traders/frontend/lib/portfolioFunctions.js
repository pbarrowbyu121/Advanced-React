import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { TSLA_response, AMZN_response } from "./dummyData";

// Takes portfolio object as argument, returns array of tickers
export function uniqueTickers(Portfolio) {
  let uniqueTickers = [
    ...new Set(Portfolio.orders.map((order) => order.ticker)),
  ];
  uniqueTickers = uniqueTickers.filter((ticker) => ticker !== "$CASH");
  return uniqueTickers;
}

// function to sort orders
export function sortOrders(Portfolio, sortOrder) {
  let sortedActivity = [...Portfolio.orders];
  //   console.log("sortedActivity", sortedActivity);
  if (sortOrder === "asc") {
    return sortedActivity.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  if (sortOrder === "desc") {
    return sortedActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

// function to get earliest date of order
export function earliestDate(Portfolio) {
  //   if (Portfolio.orders.length == 0) {
  //     console.log("no orders");
  //     return 0;
  //   }
  return sortOrders(Portfolio, "asc")[0].date;
}

// function to fetch data from API
export function fetchStockData(ticker, beg_date, end_date) {
  let API_Key = "O1F92HXG7p_OFdN7G7RZsaTZd_Or7pEi";
  let url =
    "https://api.polygon.io/v2/aggs/ticker/" +
    ticker +
    "/range/1/day/" +
    beg_date +
    "/" +
    end_date +
    "?apiKey=" +
    API_Key;

  let response = fetch(url).then((res) => res.json());

  return response;
}

// function assigns tickers to API response results
export function attachTicker(response) {
  return response.results.forEach(
    (dayResult) => (dayResult.ticker = response.ticker)
  );
}

// function to get unix code in new york time
export function getUnixCode(orderDate) {
  let date1 = new Date(orderDate);
  let dateUTC = DateTime.fromObject({
    day: date1.getDate(),
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    zone: "America/New_York",
  });
  return dateUTC.ts;
}

// get Array of unique dates from API response
// input is array of daily stock objects
export function getUniqueDates(stockData) {
  let dateArray = [];
  stockData.forEach((item) => dateArray.push(item.t));
  let uniqueDates = [...new Set(dateArray)].sort((a, b) => a - b);
  return uniqueDates;
}

// get rate of return as ending value over total cash invested
// IMPROVE THIS TO INCLUDE STOCK, CASH, TOTAL
export function portfolioSummary(portfolioPerformance) {
  console.log("portfolioSummary called");
  if (portfolioPerformance.length === 0)
    return {
      startDate: 0,
      roi: 0,
      investment: 0,
    };
  console.log("portfolioPerformance", portfolioPerformance);
  let invested = 0;
  let finalValue =
    portfolioPerformance[portfolioPerformance.length - 1].summary.total;
  portfolioPerformance.forEach((day) => {
    day.orders.forEach((order) => {
      if (order.action === "BUY" && order.ticker === "$CASH") {
        invested = invested + order.shares * order.price;
      }
    });
  });

  let summaryObj = {
    startDate: portfolioPerformance[0].date,
    roi: (finalValue / invested - 1) * 100,
    investment: invested,
  };
  console.log("portfolio Summary", summaryObj);
  return summaryObj;
}
