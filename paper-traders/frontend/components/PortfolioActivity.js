import React from "react";
import TableStyles from "./styles/TableStyles";
import TableTitle from "./styles/TableTitle";
import Order from "./Order";
import { sortOrders } from "../lib/portfolioFunctions";
import styled from "styled-components";

export default function PortfolioActivity({ portfolio }) {
  if (!portfolio || portfolio.orders.length === 0) {
    console.log("portfolio", portfolio);
    return <p>Nothing to see here</p>;
  }
  // console.log("orders here", portfolio.orders.length);
  let sortedActivity = sortOrders(portfolio, "desc");
  return (
    <div>
      <TableTitle>Portfolio: {portfolio.name}</TableTitle>
      <TableStyles>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Action</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedActivity.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </tbody>
      </TableStyles>
    </div>
  );

  // sort the portfolio activity so most recent orders at top
}
