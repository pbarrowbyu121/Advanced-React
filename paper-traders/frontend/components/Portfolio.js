import { QueryDocumentKeys } from "graphql/language/visitor";
import Order from "./Order";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import PortfolioActivity from "./PortfolioActivity";
import PortfolioPerformance from "./PortfolioPerformance";

const SINGLE_PORTFOLIO_QUERY = gql`
  query SINGLE_PORTFOLIO_QUERY($id: ID!) {
    Portfolio(where: { id: $id }) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <PortfolioActivity portfolio={data.Portfolio} />
      <PortfolioPerformance portfolio={data.Portfolio} />
      <p>Individual portfolio page reached {id}</p>
    </div>
  );
}
