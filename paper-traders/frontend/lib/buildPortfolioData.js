import { getUnixCode } from "./portfolioFunctions";

// DESCRIPTION: function to build array of daily portfolio performance including stocks
// and orders associated with that day
// INPUTS: uniqueDatesArray, uniqueTickersArray, stockData, portfolioOrders
// RETURNS: Array of objects which then becomes the performance field in portfolio object
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
// DEPENDENCIES: getUnixCode
export function buildPortfolioData(
  uniqueDatesArray,
  uniqueTickersArray,
  stockData,
  portfolioOrders
) {
  // console.log("buildPortfolioData called");
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
  // console.log("buildPortfolioData return", portfolioData);
  return portfolioData;
}
