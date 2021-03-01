import { useEffect, useState } from "react";
import { TSLA_response, AMZN_response } from "./dummyData";

export function getStockData(portfolio) {
  // console.log("getStockData input", portfolio);
  // trying to use hooks to store response in state
  // console.log("TSLA_response", TSLA_response);
  const [response, setResponse] = useState([]);
  const portfolioValues = Object.values(portfolio).join("");

  // test update of state with dummy data
  useEffect(() => {
    console.log("Use Effect called");
    // if (portfolio.orders.length === 0) {
    //   setResponse([]);
    // } else {
    //   setResponse([TSLA_response, AMZN_response]);
    // }
    setResponse([TSLA_response, AMZN_response]);
  }, [portfolioValues]);

  return response;
}
