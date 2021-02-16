import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const ADD_CASH_MUTATION = gql`
  mutation ADD_CASH_MUTATION(
    # which variables are passed in and types
    $shares: Int!
    $date: String!
  ) {
    createOrder(
      data: {
        action: "buy"
        ticker: "$CASH"
        price: 1
        shares: $shares
        date: $date
      }
    ) {
      id
    }
  }
`;

export default function AddCash() {
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    shares: 0,
    date: "",
  });
  const [createOrder, { loading, error, data }] = useMutation(
    ADD_CASH_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <div>
      <h3>Add Cash</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("inputs", inputs);
          // submit the input fields to the backend
          const res = await createOrder();
          console.log("new order", res);
          clearForm();
        }}
      >
        <DisplayError error={error} />
        <fieldset disabled={loading}>
          {/* Input for username */}
          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </label>
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
            <input
              type="text"
              id="portfolio"
              name="portfolio"
              value={inputs.portfolio}
              onChange={handleChange}
            />
          </label>
          {/* input field for date of Order */}
          <div>
            {" "}
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
          <button type="submit">Add Cash</button>
        </fieldset>
      </form>
    </div>
  );
}
