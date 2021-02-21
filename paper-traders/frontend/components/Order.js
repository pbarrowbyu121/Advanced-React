import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DeleteOrder from "./DeleteOrder";
import formatMoney from "../lib/formatMoney";

function Order({ order }) {
  return (
    <tr>
      <td>{order.ticker}</td>
      <td>{order.action}</td>
      <td>{order.shares.toLocaleString()}</td>
      <td>{formatMoney(order.price)}</td>
      <td>{formatMoney(order.shares * order.price)}</td>
      <td>{format(new Date(order.date), "MM-dd-yyyy")}</td>
      <td>
        <DeleteOrder id={order.id} />
      </td>
    </tr>
  );
}

export default Order;
