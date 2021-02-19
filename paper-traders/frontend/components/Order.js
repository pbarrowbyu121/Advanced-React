import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DeleteOrder from "./DeleteOrder";

function Order({ order }) {
  return (
    <tr>
      <td>{order.ticker}</td>
      <td>{order.action}</td>
      <td>{order.price}</td>
      <td>{order.shares}</td>
      <td>{format(new Date(order.date), "yyyy-MM-dd")}</td>
      <td>
        <DeleteOrder id={order.id} />
      </td>
    </tr>
  );
}

export default Order;
