import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DeleteOrder from "./DeleteOrder";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";

function Order({ order }) {
  return (
    <tr key={order.id}>
      <td></td>
      <td>{order.ticker}</td>
      <td>{order.action}</td>
      <td>{order.shares.toLocaleString()}</td>
      <td>{formatMoney(order.price)}</td>
      <td>{formatMoney(order.shares * order.price)}</td>
      <td>{format(new Date(order.date), "MM-dd-yyyy")}</td>
      <td>
        <Link href={{ pathname: "../update", query: { id: order.id } }}>
          Edit
        </Link>{" "}
        / <DeleteOrder id={order.id} />
      </td>
    </tr>
  );
}

export default Order;
