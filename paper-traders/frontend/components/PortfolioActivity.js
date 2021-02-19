import React from "react";
// import Order from ".Order";
import Table from "./styles/Table";
import Order from "./Order";
import { sortOrders } from "../lib/portfolioFunctions";
// import console from "console";

export default function PortfolioActivity({ portfolio }) {
  if (!portfolio || portfolio.orders.length === 0) {
    // console.log("no orders!!");
    return <p>Nothing to see here</p>;
  }
  // console.log("orders here", portfolio.orders.length);
  let sortedActivity = sortOrders(portfolio, "desc");
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Action</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedActivity.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );

  // sort the portfolio activity so most recent orders at top
}
