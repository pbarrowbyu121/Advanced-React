import React, { useContext } from "react";
import PortfolioActivity from "./PortfolioActivity";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Portfolio from "./Portfolio";
import Link from "next/link";
import { CURRENT_USER_QUERY, useUser } from "./User";
import { UserContext } from "../contexts/UserContext";
import PortfolioListItem from "./PortfolioListItem";
import TableTitle from "./styles/TableTitle";
import TableStyles from "./styles/TableStyles";
import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import PortfolioStyles from "./styles/PortfolioStyles";
import NewPortfolio from "./NewPortfolio";
import NewPortfolioStyles from "./styles/NewPortfolioStyles";
import { TSLA_response, AMZN_response, AAPL_response } from "../lib/dummyData";

function PortfolioList() {
  const userState = useContext(UserContext);
  if (!userState) return <p>PortfolioList will go here</p>;

  // console.log("userState", userState);

  return (
    userState !== undefined && (
      <div>
        <PortfolioStyles>
          <TableTitle>Portfolios for {userState.name}</TableTitle>
          <TableStyles>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>Invested</th>
                <th>Stock</th>
                <th>Cash</th>
                <th>Total</th>
                <th>ROI</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userState &&
                userState.portfolios.map((portfolio) => (
                  <PortfolioListItem portfolio={portfolio} key={portfolio.id} />
                ))}
              <NewPortfolio />
            </tbody>
          </TableStyles>
        </PortfolioStyles>
      </div>
    )
  );
}

export default PortfolioList;
