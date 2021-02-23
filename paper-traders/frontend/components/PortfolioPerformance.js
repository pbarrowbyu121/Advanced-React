import { getPortfolioPerformance } from "../lib/portfolioFunctions";
import PortfolioChart from "./PortfolioChart";
import { TSLA_response, AMZN_response } from "../lib/dummyData";

export default function PortfolioPerformance({ portfolio }) {
  if (!portfolio || portfolio.orders.length === 0) return <p>No orders</p>;

  let portfolioPerformance = getPortfolioPerformance(portfolio).performance;
  return (
    <div>
      <PortfolioChart data={portfolioPerformance} />
    </div>
  );
}
