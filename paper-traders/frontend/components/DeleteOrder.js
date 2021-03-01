import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY, useUser } from "./User";

const deleteStyle = {
  cursor: "pointer",
  color: "var(--red)",
};
const DELETE_ORDER_MUTATION = gql`
  mutation DELETE_ORDER_MUTATION($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

// optimistic promise to update the cache
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteOrder));
}

export default function DeleteOrder({ id }) {
  const [deleteOrder, { loading }] = useMutation(DELETE_ORDER_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteOrder: {
    //     __typename: "Order",
    //     id,
    //   },
    // },
    // refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    // <button
    //   type="button"
    //   title="Delete this order"
    //   onClick={deleteOrder}
    //   disabled={loading}
    // >
    //   &times;
    // </button>
    <a
      title="Delete this order"
      onClick={deleteOrder}
      disabled={loading}
      style={deleteStyle}
    >
      DELETE
    </a>
  );
}
