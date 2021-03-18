import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";
import {
  portfolioSummary,
  earliestDate,
  getDateFromMillis,
} from "../lib/portfolioFunctions";
import DeletePortfolio from "./DeletePortfolio";

function PortfolioListItem({ portfolio }) {
  if (!portfolio) return <p>Nothing here</p>;

  let { cash, investment, roi, startDate, stock, total } = portfolio.summary;
  // console.log("start Date for list", startDate);
  startDate = new Date(
    getDateFromMillis(startDate).year,
    getDateFromMillis(startDate).month - 1,
    getDateFromMillis(startDate).day
  );
  roi = parseFloat(roi).toFixed(2);
  let roiColor = roi > 0 ? "green" : roi === 0 ? "black" : "red";

  return (
    <tr>
      <td></td>
      <td>
        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
      </td>
      <td>{format(startDate, "MM-dd-yyyy")}</td>
      <td>{formatMoney(investment)}</td>
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
