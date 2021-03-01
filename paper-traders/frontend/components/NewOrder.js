import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY, useUser } from "./User";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import CartStyles from "./styles/CartStyles";
// import NewOrderStyles from "./styles/NewOrderStyles";
import TableStyles from "./styles/TableStyles";
import NewOrderStyles1 from "./styles/NewOrderStyles";
import { getUnixCode } from "../lib/portfolioFunctions";

const NEW_ORDER_MUTATION = gql`
  mutation NEW_ORDER_MUTATION(
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

function checkAction(inputs, portfolioPerformance) {
  // console.log("pressed button");
  let cashCheck;
  let stockCheck;
  let availShares;
  console.log("date here", inputs.date);
  console.log("performance to be filtered here", portfolioPerformance);

  let checkDay = portfolioPerformance.filter(
    (day) => day.date === getUnixCode(inputs.date)
  )[0];

  // If BUY, check there is enough cash on that day

  if (inputs.action === "BUY") {
    cashCheck = inputs.price * inputs.shares <= checkDay.summary.cash;
    console.log("cashCheck", cashCheck);
    return cashCheck;
  }

  // If SELL, check there is enough shares of stock to be sold
  if (inputs.action === "SELL") {
    availShares = checkDay.stocks.filter(
      (stock) => stock.ticker === inputs.ticker
    )[0].shares;
    stockCheck = inputs.shares <= availShares;
    console.log("availShares", availShares);
    console.log("stockCheck", stockCheck);
    return stockCheck;
  }
}

// optimistic promise to update the cache
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.createOrder));
}

export default function NewOrder({ portfolioId, portfolioPerformance }) {
  // console.log("NewOrder portfolioPerformanc", portfolioPerformance);

  // console.log("NewOrder here", portfolioId);
  const user = useUser();
  // console.log("user", user);
  if (!user) return null;
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    action: "",
    ticker: "",
    shares: 0,
    price: 0,
    date: "",
    // dateUTC: 0,
    portfolioId: portfolioId,
    userId: user.id,
  });
  const [createOrder, { loading, error, data }] = useMutation(
    NEW_ORDER_MUTATION,
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
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        if (checkAction(inputs, portfolioPerformance)) {
          // submit the input fields to the backend
          const res = await createOrder();
          // console.log("new order", res);
          clearForm();
          inputs.userId = user.id;
        } else {
          console.log("ACTION NOT ALLOWED");
        }
      }}
    >
      <fieldset disabled={loading}>
        <DisplayError error={error} />

        <label htmlFor="ticker">
          Stock:
          <input
            required
            type="text"
            id="ticker"
            name="ticker"
            value={inputs.ticker}
            onChange={handleChange}
          />
        </label>

        {/* Input for action type */}

        <label htmlFor="action">
          Action:
          <select name="action" value={inputs.action} onChange={handleChange}>
            <option value="">Select one</option>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </label>
        {/* Input for shares */}

        <label htmlFor="shares">
          Shares:
          <input
            type="number"
            id="shares"
            name="shares"
            value={inputs.shares}
            onChange={handleChange}
          />
        </label>

        {/* Input for price  */}

        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        {/* input field for date */}

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
        {/* button to add the order */}
        <button type="submit">Add Order</button>
        {" / "}
        {/* button to clear the form */}
        <a onClick={clearForm} style={{ cursor: "pointer" }}>
          Clear
        </a>
        <button
          type="button"
          onClick={() => console.log(checkAction(inputs, portfolioPerformance))}
        >
          Press Me
        </button>
      </fieldset>
    </Form>
  );
}
