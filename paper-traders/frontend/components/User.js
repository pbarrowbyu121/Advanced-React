import { gql, useQuery } from "@apollo/client";

import { TSLA_response, AMZN_response, AAPL_response } from "../lib/dummyData";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
        portfolios {
          id
          name
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
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
