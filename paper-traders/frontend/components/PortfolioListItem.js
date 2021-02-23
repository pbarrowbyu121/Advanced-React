import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DeleteOrder from "./DeleteOrder";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";
import { portfolioSummary, earliestDate } from "../lib/portfolioFunctions";
import { DateTime } from "luxon";

function PortfolioListItem({ portfolio }) {
  console.log("portfolio here", portfolio);
  let startDate = new Date();
  let invested = 0;
  let stock = 0;
  let cash = 0;
  let roi = 0;
  let total = 0;

  let summaryObj = {
    stock: 0,
    cash: 0,
    total: 0,
  };

  //   let listComponent =

  //   if (portfolio.orders.length !== 0) {
  //     // let portfolioSummary = portfolioSummary(portfolio.performance);
  //     console.log(
  //       "Portfolio earliest date",
  //       portfolio.name,
  //       earliestDate(portfolio)
  //     );
  //     summaryObj =
  //       portfolio.performance[portfolio.performance.length - 1].summary;
  //     let portfolioSummaryObj = portfolioSummary(portfolio.performance);
  //     startDate = DateTime.fromMillis(
  //       Date.parse(new Date(earliestDate(portfolio))),
  //       {
  //         zone: "America/New_York",
  //       }
  //     );
  //     invested = portfolioSummaryObj.investment;
  //     stock = summaryObj.stock;
  //     cash = summaryObj.cash;
  //     total = summaryObj.total;
  //     roi = parseFloat(portfolioSummaryObj.roi).toFixed(2);
  //   }

  let roiColor = roi > 0 ? "green" : roi === 0 ? "black" : "red";

  return (
    <tr>
      <td>
        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
      </td>
      <td>
        {format(
          startDate,
          //   new Date(startDate.year, startDate.month - 1, startDate.day),
          "MM-dd-yyyy"
        )}
      </td>
      <td>{formatMoney(invested)}</td>
      <td>{formatMoney(stock)}</td>
      <td>{formatMoney(cash)}</td>
      <td>{formatMoney(total)}</td>
      <td style={{ color: roiColor }}>{roi + "%"}</td>
    </tr>
  );
}

export default PortfolioListItem;
