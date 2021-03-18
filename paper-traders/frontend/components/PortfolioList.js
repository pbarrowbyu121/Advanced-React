import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import PortfolioListItem from "./PortfolioListItem";
import TableTitle from "./styles/TableTitle";
import TableStyles from "./styles/TableStyles";
import PortfolioStyles from "./styles/PortfolioStyles";
import NewPortfolio from "./NewPortfolio";

function PortfolioList() {
  const userState = useContext(UserContext);
  if (userState === null) return <p>PortfolioList will go here</p>;

  // console.log("userState", userState);

  return (
    userState !== undefined && (
      <div>
        <PortfolioStyles>
          <div class="notebook-top"></div>
          <TableTitle>Portfolios for {userState.name}</TableTitle>
          <TableStyles>
            <thead>
              <tr>
                <th></th>
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
