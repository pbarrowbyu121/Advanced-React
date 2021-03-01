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
import NewPortfolioStyles from "./styles/NewPortfolioStyles";

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

// // optimistic promise to update the cache
// function update(cache, payload) {
//   cache.evict(cache.identify(payload.data.authenticatedItem));
// }

export default function NewPortfolio() {
  const user = useUser();
  // console.log("user", user);
  if (!user) return null;
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    name: "",
    userId: user.id,
  });
  const [createPortfolio, { loading, error, data }] = useMutation(
    NEW_PORTFOLIO_MUTATION,
    {
      variables: inputs,
      // update,

      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  if (loading) return <td>Loading...</td>;
  if (error) return <td>Error: {error}</td>;
  return (
    <NewPortfolioStyles>
      {/* <tr> */}
      <td colSpan="3">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // console.log("inputs", inputs);
            // submit the input fields to the backend
            const res = await createPortfolio();
            clearForm();
            inputs.userId = user.id;
          }}
        >
          <DisplayError error={error} />
          <fieldset disabled={loading} id="new_portfolio">
            {/* Input for portfolio name */}
            {/* <label htmlFor="name"> */}
            {/* Name: */}
            <input
              required
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              placeholder="Add Portfolio"
              onChange={handleChange}
            />
            {/* </label> */}
            <button id="add_portfolio_button" type="submit">
              Add Portfolio
            </button>
          </fieldset>
        </form>
      </td>
      {/* </tr> */}
    </NewPortfolioStyles>
  );
}
