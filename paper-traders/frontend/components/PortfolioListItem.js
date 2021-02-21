import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DeleteOrder from "./DeleteOrder";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";

function PortfolioListItem({ portfolio }) {
  return (
    <tr>
      <td>
        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
      </td>
      <td>Stock value</td>
      <td>Cash value</td>
      <td>Total value</td>
    </tr>
  );
}

export default PortfolioListItem;
