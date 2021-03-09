import { QueryDocumentKeys } from "graphql/language/visitor";
import Order from "./Order";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import PortfolioActivity from "./PortfolioActivity";
import PortfolioPerformance from "./PortfolioPerformance";
import PortfolioStyles from "./styles/PortfolioStyles";
import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import { useState, useEffect, useContext } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import NewOrderStyles from "./styles/NewOrderStyles";
import NewOrder from "./NewOrder";
import NewOrderButtonStyles from "./styles/NewOrderButtonStyles";
import NewOrderButton from "./NewOrderButton";
import AddCash from "./AddCash";
import { TSLA_response, AMZN_response, AAPL_response } from "../lib/dummyData";
import { UserContext } from "../contexts/UserContext";
import PortfolioPerformanceStyles from "./styles/PortfolioPerformanceStyles";
// import NewOrderStyles1 from "./styles/NewOrderStyles";

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

// const SINGLE_PORTFOLIO_QUERY = gql`
//   query SINGLE_PORTFOLIO_QUERY($id: ID!) {
//     Portfolio(where: { id: $id }) {
//       #   id
//       name
//       user {
//         name
//       }
//       orders {
//         id
//         action
//         ticker
//         price
//         shares
//         date
//       }
//     }
//   }
// `;

export default function Portfolio({ id }) {
  const userState = useContext(UserContext);

  if (!userState) return null;

  const [state, setOrderToggle] = useState({
    newOrder: false,
    cashOrder: false,
  });

  const [timeLineState, setTimeLineState] = useState(21);

  // filter userState for the portfolio for this page
  let portfolio = userState.portfolios.filter(
    (portfolio) => portfolio.id === id
  )[0];
  // console.log("portfolio page", portfolio);

  // console.log("portfolio performance length", portfolio.performance.length);

  // determine how many items to include in chart based on radio buttons
  let sliceAmount =
    timeLineState === "ALL"
      ? portfolio.performance.length
      : Math.min(timeLineState, portfolio.performance.length);
  // console.log("sliceAmount", sliceAmount);

  // filter portfolio data for days only included in this portfolio
  let portfolioSpecificPerformance = portfolio.performance.filter(
    (day) => day.date >= portfolio.summary.startDate
  );

  // filter performance data for last n items, n is the number from radio button filter
  let performanceForChart = portfolioSpecificPerformance.slice(
    Math.max(portfolio.performance.length - sliceAmount, 0)
  );

  // console.log("performance for Chart", performanceForChart);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Shows list of orders in portfolio*/}
      <PortfolioStyles>
        {portfolio && (
          <PortfolioActivity portfolioId={id} portfolio={portfolio} />
        )}
      </PortfolioStyles>

      {/* New Order Button */}
      <NewOrderButtonStyles>
        <AddCircleIcon style={AddCircleIconStyle}>AddCircleIcon</AddCircleIcon>
        <a
          onClick={() => {
            setOrderToggle({ newOrder: !state.newOrder, cashOrder: false });
          }}
        >
          New Order
        </a>
      </NewOrderButtonStyles>

      {/* Add Cash Button */}
      <NewOrderButtonStyles>
        <AddCircleIcon
          style={AddCircleIconStyle}
          onClick={() => {
            setOrderToggle({ newOrder: false, cashOrder: !state.cashOrder });
          }}
        >
          AddCircleIcon
        </AddCircleIcon>
        <a
          onClick={() => {
            setOrderToggle({ newOrder: false, cashOrder: !state.cashOrder });
          }}
        >
          Add Cash
        </a>
      </NewOrderButtonStyles>

      {/* Add Order form, should appear from side */}
      {id && state.newOrder && (
        <NewOrderStyles>
          <a
            onClick={() => {
              setOrderToggle({ newOrder: false, cashOrder: false });
            }}
          >
            Close
          </a>
          <NewOrder
            portfolioId={id}
            portfolioPerformance={portfolio.performance}
          />
        </NewOrderStyles>
      )}

      {/* Add Cash form, should appear from side */}
      {id && state.cashOrder && (
        <NewOrderStyles>
          <a
            onClick={() =>
              setOrderToggle({ newOrder: false, cashOrder: false })
            }
          >
            Close
          </a>
          <AddCash portfolioId={id} />
        </NewOrderStyles>
      )}

      {/* Filter for Chart */}
      <div>
        <label>1w</label>
        <input
          type="radio"
          name="timeLine"
          value={timeLineValues.week}
          onChange={() => setTimeLineState(timeLineValues.week)}
          // checked="checked"
        />
        <label>1m</label>
        <input
          type="radio"
          name="timeLine"
          value={timeLineValues.month}
          onChange={() => setTimeLineState(timeLineValues.month)}
          checked={timeLineState === timeLineValues.month ? "checked" : null}
        />
        <label>1y</label>
        <input
          type="radio"
          name="timeLine"
          value={timeLineValues.year}
          onChange={() => setTimeLineState(timeLineValues.year)}
          checked={timeLineState === timeLineValues.year ? "checked" : null}
        />
        <label>ALL</label>
        <input
          type="radio"
          name="timeLine"
          value={500}
          onChange={() => setTimeLineState("ALL")}
          checked={timeLineState === "ALL" ? "checked" : null}
        />
      </div>
      <div>Timeline: {timeLineState}</div>

      {/* Chart to show the portfolio performance */}
      {portfolio && (
        <PortfolioPerformanceStyles>
          <PortfolioPerformance portfolioPerformance={performanceForChart} />
        </PortfolioPerformanceStyles>
      )}
    </div>
  );
}
