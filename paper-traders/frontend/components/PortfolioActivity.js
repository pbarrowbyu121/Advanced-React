import React from "react";
// import Order from ".Order";
import Table from "./styles/Table";
import Order from "./Order";

export default function PortfolioActivity({ portfolio }) {
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
          </tr>
        </thead>
        <tbody>
          {portfolio.orders.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
