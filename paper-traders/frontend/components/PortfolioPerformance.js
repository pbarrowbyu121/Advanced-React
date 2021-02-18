import React from "react";
import { format } from "date-fns";
import { CalendarContainer } from "react-datepicker";
import { DateTime } from "luxon";
import PortfolioChart from "./PerformanceChart";

// const API_key = process.env.API_KEY;
const API_key = "O1F92HXG7p_OFdN7G7RZsaTZd_Or7pEi";

// this is how data comes in from the API, except for symbol which is added by me
// t is the date and time at the beginning of the day/period
const dummy_data = [
  {
    c: 81.118,
    h: 82.6,
    l: 80.037,
    n: 178525,
    o: 82.058,
    symbol: "TSLA",
    t: 1576818000000, //Dec 20, 2019
    v: 73926030,
    vw: 81.1522,
  },
  {
    c: 83.844,
    h: 84.402,
    l: 82,
    n: 183453,
    o: 82.356,
    symbol: "TSLA",
    t: 1577077200000, //Dec 23, 2019
    v: 66664105,
    vw: 83.7282,
  },
  {
    c: 85.05,
    h: 85.094,
    l: 82.5375,
    n: 104056,
    o: 83.672,
    symbol: "TSLA",
    t: 1577163600000, // Dec 24, 2019
    v: 40266100,
    vw: 84.0108,
  },
  {
    c: 1786.5,
    h: 1802.97,
    l: 1782.45,
    n: 72698,
    o: 1799.615,
    symbol: "AMZN",
    t: 1576818000000, //Dec 20, 2019
    v: 5152450,
    vw: 1791.8484,
  },
  {
    c: 1793,
    h: 1793,
    l: 1784.51,
    n: 48810,
    o: 1788.26,
    symbol: "AMZN",
    t: 1577077200000, //Dec 23, 2019
    v: 2137493,
    vw: 1789.6817,
  },
  {
    c: 1789.21,
    h: 1795.57,
    l: 1787.575,
    n: 24911,
    o: 1793.81,
    symbol: "AMZN",
    t: 1577163600000, //Dec 24, 2019
    v: 881337,
    vw: 1791.0794,
  },
];

class PortfolioPerformance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: null,
      tickerData: [],
      results: "",
    }
  }

  // gets data for each stock in portfolio and stores API results in state
  fetchStockData = () => {
    // let { tickers } = this.props;
    // let luxon_beg_date = DateTime.fromMillis(this.props.beg_date);
    // // let luxon_end_date = DateTime.fromMillis(this.props.end_date);
    // let luxon_end_date = DateTime.fromMillis(Date.parse(new Date()));

    // // create array of urls
    // let urls = tickers.map(
    //   (ticker) =>
    //     "https://api.polygon.io/v2/aggs/ticker/" +
    //     ticker +
    //     "/range/1/day/" +
    //     luxon_beg_date +
    //     "/" +
    //     luxon_end_date +
    //     "?apiKey=" +
    //     API_key
    // );

    // // console.log(urls);

    // // map every url to promise of a fetch
    // let requests = urls.map((url) => fetch(url).then((res) => res.json()));

    // // returns fetched data into state results field
    // Promise.all(requests)
    //   .then((responses) => {
    //     return responses;
    //   })
    //   .then((res) => Promise.all(res.map((r) => r)))
    //   .then((resArray) => {
    //     resArray.forEach((stockResponse) => {
    //       //   console.log(stockResponse.ticker, stockResponse.results);
    //       stockResponse.results.forEach((dayResult) => {
    //         dayResult.symbol = stockResponse.ticker;
    //       });
    //     });
    //     return resArray;
    //   })
    //   .then((res) => res.map((res) => res.results))
    //   .then((res) => [].concat.apply([], res))
    //   .then((res) => {
    //     this.setState({
    //       results: res,
    //     });
    //   });
  };

  // build portfolio shell
  buildPortfolioShell = (e) => {
    let { activity, tickers } = this.props;
    let portfolioData = [];

    // Pass in data (could be dummy data)
    // const dataSet = dummy_data;
    const dataSet = this.state.results;

    // get Array of unique dates from returned ticker data
    // COULD BE SEPARATE FUNCTION?
    let dateArray = [];
    dataSet.forEach((item) => dateArray.push(item.t));
    let uniqueDates = [...new Set(dateArray)].sort((a, b) => a - b);

    // Sets up Portfolio shell by day and puts in each stock data for each day
    uniqueDates.forEach((date) => {
      let tempPortDay = {
        summary: {},
        date: date,
        stocks: [],
        orders: [],
      };
      // put stocks in array for each day
      tickers.forEach((ticker) => {
        dataSet.forEach((item) => {
          if (item.t === date && item.symbol === ticker) {
            tempPortDay.stocks.push(item);
          }
        });

        // put orders in array for each day and stock
        activity.forEach((order) => {
          if (order.ticker === ticker && order.unix_date === date) {
            tempPortDay.orders.push(order);
          }
        });
      });

      // put cash orders in for each day
      activity.forEach((order) => {
        if (order.ticker === "$CASH" && order.unix_date === date) {
          tempPortDay.orders.push(order);
        }
      });

      // Push the portfolio day into the portfolio array
      portfolioData.push(tempPortDay);
    });
    return portfolioData;
  };

  // caculate the summary and totals for each day
  handleCalculatePortfolio = (e) => {
    let { tickers } = this.props;
    let portfolioShell = this.buildPortfolioShell();
    let cash = 0;
    let stockAssets = 0;

    // calculate the stock shares for each stock each day
    tickers.forEach((ticker) => {
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
          if (stock.symbol === ticker) {
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
    console.log(portfolioShell);
    this.setState({
      portfolioData: portfolioShell,
    });
  };

  // dummy function to console log various things
  handleFeedback = (e) => {
    console.log(this.state.portfolioData);
  };

  render() {
    let { activity } = this.props;

    let chartComponent;
    if (this.state.portfolioData) {
      chartComponent = <PortfolioChart data={this.state.portfolioData} />;
    } else {
      chartComponent = <p>Waiting for Data</p>;
    }

    return (
      <div>
        <button onClick={this.fetchStockData}>Get Stock Data</button>
        <button onClick={this.handleCalculatePortfolio}>
          Get Stock Performance
        </button>
        <button onClick={this.handleFeedback}>Feedback</button>
        <p>Portfolio Performance here:</p>
        {chartComponent}
      </div>
    );
  }
}

export default PortfolioPerformance;
