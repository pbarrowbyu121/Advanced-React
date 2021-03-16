import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Form from "./styles/Form";
import { getUnixCode } from "../lib/portfolioFunctions";
import NewOrderStyles from "./styles/NewOrderStyles";
import { CURRENT_USER_QUERY, useUser } from "./User";

const NEW_WATCHLIST_MUTATION = gql`
  mutation NEW_WATCHLIST_MUTATION($symbol: String!, $userId: ID!) {
    createWatchlist(
      data: { symbol: $symbol, user: { connect: { id: $userId } } }
    ) {
      id
    }
  }
`;

// optimistic promise to update the cache
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.createWatchlist));
}

export default function NewWatchlistItem({
  portfolioId,
  portfolioPerformance,
  handler,
}) {
  const user = useUser();
  // console.log("user", user);
  if (!user) return null;
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    symbol: "",
    userId: user.id,
  });
  const [createWatchlist, { loading, error, data }] = useMutation(
    NEW_WATCHLIST_MUTATION,
    {
      variables: inputs,
      update,

      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );

  // console.log("new order", inputs);
  return (
    <NewOrderStyles>
      <a onClick={handler}>Close</a>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();

          // submit the input fields to the backend
          const res = await createWatchlist();
          // console.log("new order", res);
          clearForm();
          inputs.userId = user.id;
        }}
      >
        <fieldset disabled={loading}>
          <DisplayError error={error} />

          <label htmlFor="symbol">
            Stock:
            <input
              required
              type="text"
              id="symbol"
              name="symbol"
              value={inputs.symbol}
              onChange={handleChange}
            />
          </label>

          {/* button to add the order */}
          <button type="submit">Add to Watchlist</button>
        </fieldset>
      </Form>
    </NewOrderStyles>
  );
}
