// DESCRIPTION: function to actually calculate performance
// INPUTS: uniqueTickersArray, portfolioShell,
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
// FUNCTIONS CALLED:
export function calculatePerformance(uniqueTickersArray, portfolioShell) {
  // console.log("calculatePerformance called");
  let cash = 0;
  let stockAssets = 0;

  // calculate the stock shares for each stock each day
  uniqueTickersArray.forEach((ticker) => {
    // console.log("ticker", ticker);
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
  // console.log("calculatePerformance return", portfolioShell);
  return portfolioShell;
}
