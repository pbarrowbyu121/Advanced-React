import { DateTime } from "luxon";

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
  if (sortOrder === "asc") {
    return sortedActivity.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  if (sortOrder === "desc") {
    return sortedActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

// function to get earliest date of order
export function earliestDate(Portfolio) {
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
  console.log(response);
  return response;

  //   console.log(ticker, url);
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

// build portfolio data
export function buildPortfolioData(
  uniqueDatesArray,
  uniqueTickersArray,
  stockData,
  portfolioOrders
) {
  console.log("uniqueDatesArray", uniqueDatesArray);
  console.log("uniqueTickersArray", uniqueTickersArray);
  console.log("stockData", stockData);
  console.log("portfolioOrders", portfolioOrders);

  let portfolioData = [];
  uniqueDatesArray.forEach((date) => {
    // creates an object for each day to be populated
    let tempPortDay = {
      summary: {},
      date: date,
      stocks: [],
      orders: [],
    };

    // put stocks in array for each day
    uniqueTickersArray.forEach((ticker) => {
      //   console.log("level 2 ticker", ticker);
      stockData.forEach((item) => {
        if (item.t === date && item.ticker === ticker) {
          //   console.log("level 3", ticker, date, item.t, item.ticker);
          tempPortDay.stocks.push(item);
        }
      });

      // put orders in array for each day and stock
      portfolioOrders.forEach((order) => {
        if (order.ticker === ticker && getUnixCode(order.date) === date) {
          tempPortDay.orders.push(order);
        }
      });
    });

    // put cash orders in for each day
    portfolioOrders.forEach((order) => {
      if (order.ticker === "$CASH" && getUnixCode(order.date) === date) {
        tempPortDay.orders.push(order);
      }
    });

    // Push the portfolio day into the portfolio array
    portfolioData.push(tempPortDay);
  });
  return portfolioData;
}

// function to actually calculate performance
// INPUTS: uniqueTickersArray, portfolioShell,
export function calculatePerformance(uniqueTickersArray, portfolioShell) {
  let cash = 0;
  let stockAssets = 0;

  // calculate the stock shares for each stock each day
  uniqueTickersArray.forEach((ticker) => {
    let shares = 0;
    portfolioShell.forEach((day) => {
      // filter orders for this ticker only
      let dayOrders = day.orders.filter((order) => order.ticker === ticker);
      dayOrders.forEach((order) => {
        if (order.action === "BUY") {
          shares = shares + order.shares;
        } else {
          shares = shares - order.shares;
        }
      });
      // add the number of shares at closing for each day's stock
      day.stocks.forEach((stock) => {
        if (stock.ticker === ticker) {
          stock.shares = shares;
        }
      });
    });
  });

  // calculate the cash for each day
  portfolioShell.forEach((day) => {
    // calculate the total stock dollars for each day
    day.stocks.forEach((stock) => {
      stockAssets = stockAssets + stock.c * stock.shares;
    });
    day.summary.stock = stockAssets;

    // calculate the cash for each day
    day.orders.forEach((order) => {
      if (order.ticker === "$CASH") {
        if (order.action === "BUY") {
          cash = cash + order.price * order.shares;
        }
      } else {
        if (order.action === "BUY") {
          cash = cash - order.price * order.shares;
        } else {
          cash = cash + order.price * order.shares;
        }
      }
    });
    day.summary.cash = cash;
    day.summary.total = cash + stockAssets;

    // need to reset stock assets to 0 before next day is calculated
    stockAssets = 0;
  });
  console.log("portfolioShell", portfolioShell);
  return portfolioShell;
}
