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
  let summary = {
    stock: 0,
    cash: 0,
    total: 0,
  };
  console.log(
    "Portfolio earliest date",
    portfolio.name,
    earliestDate(portfolio)
  );
  if (portfolio.performance.length > 0) {
    summary = portfolio.performance[portfolio.performance.length - 1].summary;
  }

  //   let portfolioSummary = portfolioSummary(portfolio.performance)

  let portfolioSummaryObj = portfolioSummary(portfolio.performance);
  let startDate = DateTime.fromMillis(
    Date.parse(new Date(earliestDate(portfolio))),
    {
      zone: "America/New_York",
    }
  );
  let invested = portfolioSummaryObj.investment;
  let roi = parseFloat(portfolioSummaryObj.roi).toFixed(2);
  // let roi = parseFloat(portfolioSummary(portfolio.performance).roi).toFixed(2);
  let roiColor = roi > 0 ? "green" : roi === 0 ? "black" : "red";

  console.log("start Date", portfolioSummary(portfolio.performance).startDate);
  return (
    <tr>
      <td>
        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
      </td>
      <td>
        {format(
          new Date(startDate.year, startDate.month - 1, startDate.day),
          "MM-dd-yyyy"
        )}
      </td>
      <td>{formatMoney(invested)}</td>
      <td>{formatMoney(summary.stock)}</td>
      <td>{formatMoney(summary.cash)}</td>
      <td>{formatMoney(summary.total)}</td>
      <td style={{ color: roiColor }}>{roi + "%"}</td>
    </tr>
  );
}

export default PortfolioListItem;
