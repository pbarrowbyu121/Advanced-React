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

const NEW_PORTFOLIO_MUTATION = gql`
  mutation NEW_PORTFOLIO_MUTATION(
    # which variables are passed in and types
    $name: String!
    $userId: ID!
  ) {
    createPortfolio(data: { name: $name, user: { connect: { id: $userId } } }) {
      id
    }
  }
`;

// optimistic promise to update the cache
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.createPortfolio));
}

export default function NewPortfolio() {
  const user = useUser();
  // console.log("user", user);
  if (!user) return null;
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    name: "",
    userId: user.id,
  });
  const [createOrder, { loading, error, data }] = useMutation(
    NEW_PORTFOLIO_MUTATION,
    {
      variables: inputs,
      update,

      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log("new portfolio", inputs);
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // console.log("inputs", inputs);
          // submit the input fields to the backend
          const res = await createPortfolio();
          console.log("new portfolio", res);
          clearForm();
          inputs.userId = user.id;
        }}
      >
        <h3>New Order</h3>
        <DisplayError error={error} />
        <fieldset disabled={loading}>
          {/* Input for portfolio name */}
          <label htmlFor="name">
            Name:
            <input
              required
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Portfolio</button>
        </fieldset>
      </Form>
    </div>
  );
}
