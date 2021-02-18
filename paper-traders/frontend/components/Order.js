import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

function Order({ order }) {
  return (
    <tr>
      <td>{order.action}</td>
      <td>{order.ticker}</td>
      <td>{order.price}</td>
      <td>{order.shares}</td>
      <td>{format(new Date(order.date), "yyyy-MM-dd")}</td>
    </tr>
  );
}

export default Order;
