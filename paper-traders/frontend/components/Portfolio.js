import PortfolioActivity from "./PortfolioActivity";
import PortfolioPerformance from "./PortfolioPerformance";
import { useState, useEffect, useContext } from "react";
import NewOrder from "./NewOrder";
import NewOrderButton from "./NewOrderButton";
import AddCash from "./AddCash";
import { UserContext } from "../contexts/UserContext";
import ChartTimeFilter from "./ChartTimeFilter";
import PortfolioChart from "./PortfolioChart";

const AddCircleIconStyle = {
  color: "var(--green)",
  cursor: "pointer",
};

const RemoveCircleIconStyle = {
  color: "var(--red)",
};

const timeLineValues = {
  week: 5,
  month: 21,
  year: 252,
};

export default function Portfolio({ id }) {
  const userState = useContext(UserContext);

  if (!userState) return null;

  // initial portfolio performance chart data is set to a month
  let portfolio = userState.portfolios.filter(
    (portfolio) => portfolio.id === id
  )[0];

  // console.log("portfolio", portfolio);

  // states for toggling order forms for stock and cash
  const [newOrderToggleState, setNewOrderToggleState] = useState(false);
  const [addCashToggleState, setAddCashToggleState] = useState(false);

  // set filter for chart function, default to monthly
  const [timeLineState, setTimeLineState] = useState(timeLineValues.month);

  let performanceForChart;

  //   // filter userState for the portfolio for this page and for days only included in this portfolio
  performanceForChart = portfolio.performance.filter(
    (day) => day.date >= portfolio.summary.startDate
  );

  // state for portfolio data for chart
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    // determine how many items to include in chart based on radio buttons
    let sliceAmount =
      timeLineState === "ALL"
        ? performanceForChart.length
        : Math.min(parseInt(timeLineState), performanceForChart.length);

    // console.log("sliceAmount", sliceAmount);
    setPortfolioData(
      performanceForChart.slice(
        Math.max(performanceForChart.length - sliceAmount, 0)
      )
    );
  }, [timeLineState]);

  function handleChartFilterChange(e) {
    let { name, value, type } = e.target;
    setTimeLineState(e.target.value);
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="portfolio">
      <div class="notebook-top"></div>
      {/* Shows list of orders in portfolio*/}
      {portfolio && (
        <PortfolioActivity portfolioId={id} portfolio={portfolio} />
      )}

      {/* New Order Button */}
      <NewOrderButton
        handler={() => {
          setNewOrderToggleState(true);
        }}
        text="New Order"
      />

      {/* Add Cash Button */}
      <NewOrderButton
        handler={() => {
          setAddCashToggleState(true);
        }}
        text="Add Cash"
      />

      {/* Add Order form, should appear from side */}
      {id && newOrderToggleState && (
        <NewOrder
          portfolioId={id}
          portfolioPerformance={portfolio.performance}
          handler={() => {
            setNewOrderToggleState(false);
          }}
        />
      )}

      {/* Add Cash form, should appear from side */}
      {id && addCashToggleState && (
        <AddCash
          portfolioId={id}
          handler={() => {
            setAddCashToggleState(false);
          }}
        />
      )}

      <ChartTimeFilter
        handler={handleChartFilterChange}
        checkedValue={timeLineState}
      />

      {/* Chart to show the portfolio performance */}
      {portfolio && (
        <div>
          <PortfolioPerformance portfolioPerformance={portfolioData} />
        </div>

        // <Chart1 data={portfolioData} />
      )}
    </div>
  );
}
