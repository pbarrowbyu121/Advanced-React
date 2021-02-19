import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY, useUser } from "./User";

const ADD_CASH_MUTATION = gql`
  mutation ADD_CASH_MUTATION(
    # which variables are passed in and types
    $action: String!
    $ticker: String!
    $shares: Int!
    $price: Int!
    $date: String!
    # $dateUTC: Int!
    $portfolioId: ID!
    $userId: ID!
  ) {
    createOrder(
      data: {
        action: $action
        ticker: $ticker
        price: $price
        shares: $shares
        date: $date
        # dateUTC: $dateUTC
        portfolio: { connect: { id: $portfolioId } }
        user: { connect: { id: $userId } }
      }
    ) {
      id
    }
  }
`;

// optimistic promise to update the cache
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.createOrder));
}

export default function AddCash() {
  const user = useUser();
  if (!user) return null;
  // console.log("user", user);
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    action: "BUY",
    ticker: "$CASH",
    shares: 0,
    price: 1,
    date: "",
    // dateUTC: 0,
    portfolioId: "",
    userId: user.id,
  });
  const [createOrder, { loading, error, data }] = useMutation(
    ADD_CASH_MUTATION,
    {
      variables: inputs,
      update,

      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  return (
    <div>
      <h3>Add Cash</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // console.log("inputs", inputs);
          // submit the input fields to the backend
          const res = await createOrder();
          // console.log("new order", res);
          clearForm();
        }}
      >
        <DisplayError error={error} />
        <fieldset disabled={loading}>
          {/* Input for shares */}
          <label htmlFor="shares">
            Amount:
            <input
              type="number"
              id="shares"
              name="shares"
              value={inputs.shares}
              onChange={handleChange}
            />
          </label>
          {/* input for portfolio */}
          <label htmlFor="portfolio">
            Portfolio:
            <select
              name="portfolioId"
              value={inputs.portfolioId}
              onChange={handleChange}
            >
              <option value={null}>Select one</option>
              {user &&
                user.portfolios.map((portfolio) => (
                  <option key={portfolio.id} value={portfolio.id}>
                    {portfolio.name}
                  </option>
                ))}
            </select>
          </label>
          {/* input field for date of Order */}
          <div>
            <label htmlFor="date">
              Date:
              <DatePicker
                type="date"
                name="date"
                selected={inputs.date}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
              />
            </label>
          </div>

          {/* button to clear the form */}
          <button type="button" onClick={clearForm}>
            Clear Form
          </button>
          <button type="submit">Execute Order</button>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            console.log("hello", inputs);
          }}
        >
          Feedback
        </button>
      </form>
    </div>
  );
}
