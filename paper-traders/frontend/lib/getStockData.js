import { useEffect, useState } from "react";
import { TSLA_response, AMZN_response } from "./dummyData";

export function getStockData(portfolio) {
  // trying to use hooks to store response in state
  const [response, setResponse] = useState([]);
  //   const portfolioValues = Object.values(portfolio).join("");

  // test update of state with dummy data
  useEffect(() => {
    // console.log("Use Effect called");
    setResponse([TSLA_response, AMZN_response]);
  }, [portfolio]);

  return response;
}
