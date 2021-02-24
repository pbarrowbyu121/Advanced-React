import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY, useUser } from "./User";

const DELETE_PORTFOLIO_MUTATION = gql`
  mutation DELETE_PORTFOLIO_MUTATION($id: ID!) {
    deletePortfolio(id: $id) {
      id
    }
  }
`;

// optimistic promise to update the cache
// function update(cache, payload) {
//   cache.evict(cache.identify(payload.data.deletePortfolio));
// }

export default function DeletePortfolio({ id }) {
  const [deletePortfolio, { loading }] = useMutation(
    DELETE_PORTFOLIO_MUTATION,
    {
      variables: { id },
      // update,
      // optimisticResponse: {
      //   deleteOrder: {
      //     __typename: "Order",
      //     id,
      //   },
      // },
      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  return (
    <button
      type="button"
      title="Delete Portfolio"
      onClick={deletePortfolio}
      disabled={loading}
    >
      &times;
    </button>
  );
}
