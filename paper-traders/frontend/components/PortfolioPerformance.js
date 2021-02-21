import {
  earliestDate,
  fetchStockData,
  uniqueTickers,
  attachTicker,
  getUnixCode,
  getUniqueDates,
  buildPortfolioData,
  calculatePerformance,
} from "../lib/portfolioFunctions";
import { useEffect, useState } from "react";
import PortfolioChart from "./PortfolioChart";

// dummy response
let TSLA_response = {
  ticker: "TSLA",
  queryCount: 30,
  resultsCount: 30,
  adjusted: true,
  results: [
    {
      v: 4.469858e7,
      vw: 762.2701,
      o: 758.49,
      c: 755.98,
      h: 774,
      l: 749.1,
      t: 1609909200000,
      n: 962690,
    },
    {
      v: 5.1498469e7,
      vw: 800.594,
      o: 777.63,
      c: 816.04,
      h: 816.99,
      l: 775.2,
      t: 1609995600000,
      n: 1164677,
    },
    {
      v: 7.505475e7,
      vw: 866.4798,
      o: 856,
      c: 880.02,
      h: 884.49,
      l: 838.39,
      t: 1610082000000,
      n: 1799619,
    },
    {
      v: 5.9553425e7,
      vw: 832.1713,
      o: 849.4,
      c: 811.19,
      h: 854.43,
      l: 803.6222,
      t: 1610341200000,
      n: 1652623,
    },
    {
      v: 4.6270587e7,
      vw: 853.4679,
      o: 831,
      c: 849.44,
      h: 868,
      l: 827.34,
      t: 1610427600000,
      n: 1006723,
    },
    {
      v: 3.3312385e7,
      vw: 846.5136,
      o: 852.76,
      c: 854.41,
      h: 860.47,
      l: 832,
      t: 1610514000000,
      n: 776362,
    },
    {
      v: 3.1265746e7,
      vw: 851.4645,
      o: 843.39,
      c: 845,
      h: 863,
      l: 838.75,
      t: 1610600400000,
      n: 695464,
    },
    {
      v: 3.8777596e7,
      vw: 838.3006,
      o: 852,
      c: 826.16,
      h: 859.9,
      l: 819.1,
      t: 1610686800000,
      n: 909529,
    },
    {
      v: 2.5366188e7,
      vw: 840.7244,
      o: 837.8,
      c: 844.55,
      h: 850,
      l: 833,
      t: 1611032400000,
      n: 611563,
    },
    {
      v: 2.5665533e7,
      vw: 849.5878,
      o: 858.74,
      c: 850.45,
      h: 859.5,
      l: 837.28,
      t: 1611118800000,
      n: 627380,
    },
    {
      v: 2.0003633e7,
      vw: 847.122,
      o: 855,
      c: 844.99,
      h: 855.7199,
      l: 841.4201,
      t: 1611205200000,
      n: 486207,
    },
    {
      v: 2.0066245e7,
      vw: 838.5908,
      o: 834.31,
      c: 846.64,
      h: 848,
      l: 828.62,
      t: 1611291600000,
      n: 552876,
    },
    {
      v: 4.1047342e7,
      vw: 873.3502,
      o: 855,
      c: 880.8,
      h: 900.4,
      l: 838.8201,
      t: 1611550800000,
      n: 971891,
    },
    {
      v: 2.3091503e7,
      vw: 885.8303,
      o: 891.38,
      c: 883.09,
      h: 895.9,
      l: 871.6,
      t: 1611637200000,
      n: 607297,
    },
    {
      v: 2.7273839e7,
      vw: 868.9032,
      o: 870.35,
      c: 864.16,
      h: 891.5,
      l: 858.66,
      t: 1611723600000,
      n: 896046,
    },
    {
      v: 2.6375707e7,
      vw: 831.3472,
      o: 820,
      c: 835.43,
      h: 848,
      l: 801,
      t: 1611810000000,
      n: 935676,
    },
    {
      v: 3.4989804e7,
      vw: 805.0688,
      o: 830.0003,
      c: 793.53,
      h: 842.41,
      l: 780.1,
      t: 1611896400000,
      n: 1315003,
    },
    {
      v: 2.5379232e7,
      vw: 823.4025,
      o: 814.29,
      c: 839.81,
      h: 842,
      l: 795.5601,
      t: 1612155600000,
      n: 817439,
    },
    {
      v: 2.4346213e7,
      vw: 869.841,
      o: 844.68,
      c: 872.79,
      h: 880.5,
      l: 842.2006,
      t: 1612242000000,
      n: 712167,
    },
    {
      v: 1.831051e7,
      vw: 861.1441,
      o: 877.02,
      c: 854.69,
      h: 878.08,
      l: 853.0646,
      t: 1612328400000,
      n: 565773,
    },
    {
      v: 1.5812661e7,
      vw: 844.5331,
      o: 855,
      c: 849.99,
      h: 856.5,
      l: 833.42,
      t: 1612414800000,
      n: 488967,
    },
    {
      v: 1.8566599e7,
      vw: 852.552,
      o: 845,
      c: 852.23,
      h: 864.77,
      l: 838.97,
      t: 1612501200000,
      n: 503358,
    },
    {
      v: 2.016145e7,
      vw: 865.6009,
      o: 869.67,
      c: 863.42,
      h: 877.77,
      l: 854.75,
      t: 1612760400000,
      n: 577764,
    },
    {
      v: 1.5151181e7,
      vw: 849.2232,
      o: 855.12,
      c: 849.46,
      h: 859.8,
      l: 841.75,
      t: 1612846800000,
      n: 537349,
    },
    {
      v: 3.6215065e7,
      vw: 814.7446,
      o: 843.635,
      c: 804.82,
      h: 844.82,
      l: 800.02,
      t: 1612933200000,
      n: 1269207,
    },
    {
      v: 2.1622753e7,
      vw: 813.7209,
      o: 812.44,
      c: 811.66,
      h: 829.8799,
      l: 801.725,
      t: 1613019600000,
      n: 634538,
    },
    {
      v: 2.3593313e7,
      vw: 800.9105,
      o: 801.26,
      c: 816.12,
      h: 817.33,
      l: 785.3306,
      t: 1613106000000,
      n: 822149,
    },
    {
      v: 1.9802204e7,
      vw: 803.631,
      o: 818,
      c: 796.22,
      h: 821,
      l: 792.44,
      t: 1613451600000,
      n: 703334,
    },
    {
      v: 2.6058887e7,
      vw: 781.2372,
      o: 779.09,
      c: 798.15,
      h: 799.84,
      l: 762.01,
      t: 1613538000000,
      n: 925842,
    },
    {
      v: 1.8257914e7,
      vw: 786.454,
      o: 780.9,
      c: 787.38,
      h: 794.69,
      l: 776.27,
      t: 1613624400000,
    },
  ],
  status: "DELAYED",
  request_id: "d5a5647c7fc92e2c6574ae0208cc80b7",
  count: 30,
};
let AMZN_response = {
  ticker: "AMZN",
  queryCount: 30,
  resultsCount: 30,
  adjusted: true,
  results: [
    {
      v: 4.394815e6,
      vw: 3162.8567,
      o: 3146.48,
      c: 3138.38,
      h: 3197.509,
      l: 3131.16,
      t: 1609909200000,
      n: 236833,
    },
    {
      v: 3.514545e6,
      vw: 3183.9906,
      o: 3157,
      c: 3162.16,
      h: 3208.542,
      l: 3155,
      t: 1609995600000,
      n: 166748,
    },
    {
      v: 3.514954e6,
      vw: 3166.2416,
      o: 3180,
      c: 3182.7,
      h: 3190.64,
      l: 3142.2,
      t: 1610082000000,
      n: 190280,
    },
    {
      v: 3.654095e6,
      vw: 3131.1142,
      o: 3148.01,
      c: 3114.21,
      h: 3156.3841,
      l: 3110,
      t: 1610341200000,
      n: 211079,
    },
    {
      v: 3.484582e6,
      vw: 3116.6404,
      o: 3120,
      c: 3120.83,
      h: 3142.1418,
      l: 3086,
      t: 1610427600000,
      n: 192771,
    },
    {
      v: 3.317494e6,
      vw: 3167.1571,
      o: 3128.44,
      c: 3165.89,
      h: 3189.95,
      l: 3122.08,
      t: 1610514000000,
      n: 166014,
    },
    {
      v: 3.070919e6,
      vw: 3146.062,
      o: 3167.52,
      c: 3127.47,
      h: 3177.9999,
      l: 3120.59,
      t: 1610600400000,
      n: 158481,
    },
    {
      v: 4.223995e6,
      vw: 3110.5462,
      o: 3123.02,
      c: 3104.25,
      h: 3142.545,
      l: 3095.17,
      t: 1610686800000,
      n: 182766,
    },
    {
      v: 3.27378e6,
      vw: 3121.097,
      o: 3107,
      c: 3120.76,
      h: 3145,
      l: 3096,
      t: 1611032400000,
      n: 160325,
    },
    {
      v: 5.309835e6,
      vw: 3235.4181,
      o: 3181.99,
      c: 3263.38,
      h: 3279.8,
      l: 3175,
      t: 1611118800000,
      n: 249048,
    },
    {
      v: 4.941851e6,
      vw: 3317.4933,
      o: 3293,
      c: 3306.99,
      h: 3348.55,
      l: 3289.5675,
      t: 1611205200000,
      n: 225977,
    },
    {
      v: 2.821914e6,
      vw: 3297.9776,
      o: 3304.31,
      c: 3292.23,
      h: 3321.91,
      l: 3283.1644,
      t: 1611291600000,
      n: 132727,
    },
    {
      v: 3.749753e6,
      vw: 3305.8312,
      o: 3328.5,
      c: 3294,
      h: 3363.89,
      l: 3243.1463,
      t: 1611550800000,
      n: 183652,
    },
    {
      v: 2.955235e6,
      vw: 3323.0162,
      o: 3296.3559,
      c: 3326.13,
      h: 3338,
      l: 3282.87,
      t: 1611637200000,
      n: 138616,
    },
    {
      v: 4.660158e6,
      vw: 3266.9584,
      o: 3341.49,
      c: 3232.58,
      h: 3346.52,
      l: 3207.08,
      t: 1611723600000,
      n: 237909,
    },
    {
      v: 3.149228e6,
      vw: 3261.6402,
      o: 3235.04,
      c: 3237.62,
      h: 3301.68,
      l: 3228.69,
      t: 1611810000000,
      n: 159385,
    },
    {
      v: 4.293556e6,
      vw: 3209.3337,
      o: 3230,
      c: 3206.2,
      h: 3236.99,
      l: 3186.0001,
      t: 1611896400000,
      n: 193750,
    },
    {
      v: 4.158202e6,
      vw: 3307.9135,
      o: 3242.36,
      c: 3342.88,
      h: 3350.26,
      l: 3235.025,
      t: 1612155600000,
      n: 208720,
    },
    {
      v: 7.098106e6,
      vw: 3399.0645,
      o: 3380,
      c: 3380,
      h: 3427.74,
      l: 3361.125,
      t: 1612242000000,
      n: 349007,
    },
    {
      v: 7.088781e6,
      vw: 3370.0891,
      o: 3425.01,
      c: 3312.53,
      h: 3434,
      l: 3308.62,
      t: 1612328400000,
      n: 335473,
    },
    {
      v: 3.670661e6,
      vw: 3312.4187,
      o: 3330,
      c: 3331,
      h: 3347,
      l: 3277.75,
      t: 1612414800000,
      n: 179352,
    },
    {
      v: 3.598263e6,
      vw: 3340.8984,
      o: 3319,
      c: 3352.15,
      h: 3377,
      l: 3302.71,
      t: 1612501200000,
      n: 156673,
    },
    {
      v: 3.257391e6,
      vw: 3320.3817,
      o: 3358.5,
      c: 3322.94,
      h: 3364.9999,
      l: 3304,
      t: 1612760400000,
      n: 171436,
    },
    {
      v: 2.203526e6,
      vw: 3314.7945,
      o: 3312.49,
      c: 3305,
      h: 3338,
      l: 3297.84,
      t: 1612846800000,
      n: 126607,
    },
    {
      v: 3.02155e6,
      vw: 3281.3295,
      o: 3314,
      c: 3286.58,
      h: 3317.9548,
      l: 3254,
      t: 1612933200000,
      n: 158357,
    },
    {
      v: 2.301417e6,
      vw: 3264.9162,
      o: 3292,
      c: 3262.13,
      h: 3292,
      l: 3248.06,
      t: 1613019600000,
      n: 128763,
    },
    {
      v: 2.335339e6,
      vw: 3258.3467,
      o: 3250,
      c: 3277.71,
      h: 3280.25,
      l: 3233.31,
      t: 1613106000000,
      n: 117762,
    },
    {
      v: 2.573281e6,
      vw: 3275.0891,
      o: 3254.05,
      c: 3268.95,
      h: 3308.3,
      l: 3253.591,
      t: 1613451600000,
      n: 138112,
    },
    {
      v: 3.302099e6,
      vw: 3298.7618,
      o: 3263.6,
      c: 3308.64,
      h: 3320.91,
      l: 3259.4996,
      t: 1613538000000,
      n: 159164,
    },
    {
      v: 3.08491e6,
      vw: 3313.396,
      o: 3282.42,
      c: 3328.23,
      h: 3338,
      l: 3273.94,
      t: 1613624400000,
    },
  ],
  status: "DELAYED",
  request_id: "09a2d8e9a03d4919e7cf6a0f8d08d562",
  count: 30,
};

export default function PortfolioPerformance({ portfolio }) {
  // trying to use hooks to store response in state
  const [response, setResponse] = useState([]);

  if (!portfolio || portfolio.orders.length === 0) return <p>No orders</p>;

  // get unique tickers
  let uniqueTickersArray = uniqueTickers(portfolio);

  // get earliest and latest dates
  let beg_date = Date.parse(earliestDate(portfolio));
  console.log("earliest date", beg_date);

  // set last date, by default it will be today
  //   let end_date = Date.parse(new Date("01/31/2021"));
  let end_date = Date.parse(new Date());

  //   // get ticker data from API
  //   let stockAPIData = uniqueTickersArray.map((ticker) =>
  //     fetchStockData(ticker, beg_date, end_date)
  //   );

  // update state if portfolio activity changes
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

  // test update of state with dummy data
  useEffect(() => {
    console.log("Use Effect called");
    setResponse([TSLA_response, AMZN_response]);
  }, [portfolio]);

  if (!response) return <p>No response</p>;

  // attach ticker to each daily result
  response.map((response) => attachTicker(response));
  let stockData = [];
  response.forEach(
    (response) => (stockData = [...stockData, ...response.results])
  );

  ///// BREAK DOWN INTO FUNCTIONS

  console.log("stockData", stockData);

  let uniqueDates = getUniqueDates(stockData);

  // Sets up Portfolio shell by day and puts in each stock data for each day
  // INPUTS: uniqueDates, uniqueTickers, stockData, portfolio.orders
  let portfolioData = buildPortfolioData(
    uniqueDates,
    uniqueTickersArray,
    stockData,
    portfolio.orders
  );

  let portfolioPerformance = calculatePerformance(
    uniqueTickersArray,
    portfolioData
  );

  console.log("portfolioPerformance", portfolioPerformance);
  console.log("response", response);

  if (response === []) {
    return <p>Portfolio performance here</p>;
  }
  return (
    <div>
      <PortfolioChart data={portfolioPerformance} />
    </div>
  );
}
