import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
// import PortfolioChart from "./PortfolioChartOld";
import PortfolioChart from "./PortfolioChart";
import { TSLA_response, AMZN_response } from "../lib/dummyData";
import ChartStyles from "./styles/ChartStyles";
import Chart from "./Chart";

export default function PortfolioPerformance({ portfolioPerformance }) {
  if (!portfolioPerformance === 0) return <p>No orders</p>;

  //   let portfolioPerformance = getPortfolioPerformance(portfolio).performance;
  return (
    <ChartStyles>
      <PortfolioChart data={portfolioPerformance} />
      {/* <Chart data={portfolioPerformance} /> */}
    </ChartStyles>
  );
}
