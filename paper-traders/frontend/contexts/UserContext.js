import { createContext, useState, useEffect } from "react";
import { TSLA_response, AMZN_response, AAPL_response } from "../lib/dummyData";
import { portfolioSummary } from "../lib/portfolioFunctions";
import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import { useUser } from "../components/User";
import getStockData from "../lib/getStockData";

// dummy data for now
// const stockAPIData = [TSLA_response, AMZN_response, AAPL_response];

// make a mutable copy of User from db to add on performance data
function copyUser(user, stockData) {
  let newObj = {};
  newObj.id = user.id;
  newObj.type = user.type;
  newObj.email = user.email;
  newObj.name = user.name;
  newObj.portfolios = [];
  user.portfolios.forEach((portfolio) => {
    newObj.portfolios.push(getPortfolioPerformance(portfolio, stockData));
  });

  // attach portfolio summary to portfolio
  newObj.portfolios.forEach((portfolio) => {
    portfolio.summary = portfolioSummary(portfolio.performance);
  });
  return newObj;
}

export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const user = useUser();
  const [userState, setUserState] = useState();
  //   const [stockDataState, setStockDataState] = useState();

  useEffect(() => {
    // get the data
    // toDo: Make the fetch of data here, prep the urls elsewhere
    const urlArr = getStockData(user.portfolios);

    // returns each fetched data
    Promise.all(
      urlArr.map((url) => fetch(url).catch((err) => console.log(err)))
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((response) => {
        //   setStockDataState(response))
        setUserState(copyUser(user, response));
      });
  }, []);

  return (
    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>
  );
};
