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

function PortfolioList() {
  const user = useUser();
  console.log("user", user);
  if (!user) return null;

  return (
    <div>
      {/* <p>Portfolios Listed here</p> */}
      <TableTitle>Portfolios for {user.name}</TableTitle>
      <TableStyles>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock Value</th>
            <th>Cash</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {user.portfolios.map((portfolio) => (
            <PortfolioListItem portfolio={portfolio} key={portfolio.id} />
          ))}
        </tbody>
      </TableStyles>
    </div>
    // <div>
    //   {user.portfolios.map((portfolio) => (
    //     <div key={portfolio.id}>
    //       <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
    //       <p>final amount here</p>
    //     </div>
    //   ))}
    // </div>
  );
}

export default PortfolioList;
