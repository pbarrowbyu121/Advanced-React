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
import DeletePortfolio from "./DeletePortfolio";

function PortfolioListItem({ portfolio }) {
  if (!portfolio)
    return (
      <tr>
        <td>No portfolio</td>
      </tr>
    );
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

  if (
    portfolio &&
    portfolio.orders.length !== 0 &&
    portfolio.performance.length !== 0
  ) {
    // startDate = new Date(2021, 0, 6);
    let portfolioSummaryObj = portfolioSummary(portfolio.performance);
    console.log("startDate", portfolioSummaryObj.startDate);
    console.log(
      "Portfolio earliest date",
      portfolio.name,
      earliestDate(portfolio)
    );
    startDate = DateTime.fromMillis(portfolioSummaryObj.startDate, {
      zone: "America/New_York",
    });
    startDate = new Date(startDate.year, startDate.month - 1, startDate.day);

    invested = portfolioSummaryObj.investment;
    stock =
      portfolio.performance[portfolio.performance.length - 1].summary.stock;
    cash = portfolio.performance[portfolio.performance.length - 1].summary.cash;
    total =
      portfolio.performance[portfolio.performance.length - 1].summary.total;
    roi = parseFloat(portfolioSummaryObj.roi).toFixed(2);
  }

  let roiColor = roi > 0 ? "green" : roi === 0 ? "black" : "red";

  return (
    <tr>
      <td>
        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
      </td>
      <td>{format(startDate, "MM-dd-yyyy")}</td>
      <td>{formatMoney(invested)}</td>
      <td>{formatMoney(stock)}</td>
      <td>{formatMoney(cash)}</td>
      <td>{formatMoney(total)}</td>
      <td style={{ color: roiColor }}>{roi + "%"}</td>
      <td>
        <DeletePortfolio id={portfolio.id} />
      </td>
    </tr>
  );
}

export default PortfolioListItem;
