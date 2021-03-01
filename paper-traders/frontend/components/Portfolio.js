import { QueryDocumentKeys } from "graphql/language/visitor";
import Order from "./Order";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import PortfolioActivity from "./PortfolioActivity";
import PortfolioPerformance from "./PortfolioPerformance";
import PortfolioStyles from "./styles/PortfolioStyles";
import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import { useState, useEffect } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import NewOrderStyles from "./styles/NewOrderStyles";
import NewOrder from "./NewOrder";
import NewOrderButtonStyles from "./styles/NewOrderButtonStyles";
import NewOrderButton from "./NewOrderButton";
import AddCash from "./AddCash";
// import NewOrderStyles1 from "./styles/NewOrderStyles";

const AddCircleIconStyle = {
  color: "var(--green)",
};

const RemoveCircleIconStyle = {
  color: "var(--red)",
};

const SINGLE_PORTFOLIO_QUERY = gql`
  query SINGLE_PORTFOLIO_QUERY($id: ID!) {
    Portfolio(where: { id: $id }) {
      #   id
      name
      user {
        name
      }
      orders {
        id
        action
        ticker
        price
        shares
        date
      }
    }
  }
`;

export default function Portfolio({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PORTFOLIO_QUERY, {
    variables: { id },
  });

  const [state, setOrderToggle] = useState({
    newOrder: false,
    cashOrder: false,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // console.log("data.Portfolio", data.Portfolio);
  // console.log("performance", getPortfolioPerformance(data.Portfolio));
  let portfolioPerformance = getPortfolioPerformance(data.Portfolio)
    .performance;
  console.log("portfolioPerformance", portfolioPerformance);
  return (
    <div>
      {/* Shows list of orders in portfolio*/}
      <PortfolioStyles>
        {data.Portfolio && (
          <PortfolioActivity portfolioId={id} portfolio={data.Portfolio} />
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
            portfolioPerformance={portfolioPerformance}
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

      {/* Chart to show the portfolio performance */}
      {data.Portfolio && (
        <PortfolioPerformance portfolioPerformance={portfolioPerformance} />
      )}
    </div>
  );
}
