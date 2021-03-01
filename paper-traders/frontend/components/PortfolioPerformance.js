import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import PortfolioChart from "./PortfolioChart";
import { TSLA_response, AMZN_response } from "../lib/dummyData";

export default function PortfolioPerformance({ portfolioPerformance }) {
  if (!portfolioPerformance === 0) return <p>No orders</p>;

  //   let portfolioPerformance = getPortfolioPerformance(portfolio).performance;
  return (
    <div>
      <PortfolioChart data={portfolioPerformance} />
    </div>
  );
}
