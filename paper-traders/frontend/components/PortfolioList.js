import React from "react";
import PortfolioActivity from "./PortfolioActivity";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Portfolio from "./Portfolio";
import Link from "next/link";
import { CURRENT_USER_QUERY, useUser } from "./User";
import PortfolioListItem from "./PortfolioListItem";
import TableTitle from "./styles/TableTitle";
import TableStyles from "./styles/TableStyles";
import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import PortfolioStyles from "./styles/PortfolioStyles";
import NewPortfolio from "./NewPortfolio";
import NewPortfolioStyles from "./styles/NewPortfolioStyles";

function PortfolioList() {
  const user = useUser();
  // console.log("user", user);
  if (!user) return null;

  return (
    <div>
      <PortfolioStyles>
        <TableTitle>Portfolios for {user.name}</TableTitle>
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
            {user.portfolios.map((portfolio) => (
              <PortfolioListItem
                portfolio={getPortfolioPerformance(portfolio)}
                key={portfolio.id}
              />
            ))}
            <NewPortfolio />
          </tbody>
        </TableStyles>
      </PortfolioStyles>
    </div>
  );
}

export default PortfolioList;
