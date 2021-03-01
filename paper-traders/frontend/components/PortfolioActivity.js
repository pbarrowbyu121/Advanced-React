import React from "react";
import TableStyles from "./styles/TableStyles";
import TableTitle from "./styles/TableTitle";
import Order from "./Order";
import { sortOrders } from "../lib/portfolioFunctions";
import styled from "styled-components";
import NewOrder from "./NewOrder";
import { useState, useEffect } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import NewOrderStyles from "./styles/NewOrderStyles";

export default function PortfolioActivity({ portfolioId, portfolio }) {
  if (!portfolio || portfolio.orders.length === 0) {
    // console.log("portfolio", portfolio);
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
            <th>Edit / Delete</th>
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
}
