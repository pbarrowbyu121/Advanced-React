import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useUser } from "./User";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      action
      ticker
      price
      shares
      portfolio {
        id
        name
      }
      date
    }
  }
`;

const UPDATE_ORDER_MUTATION = gql`
  mutation UPDATE_ORDER_MUTATION(
    $id: ID!
    $action: String
    $ticker: String
    $price: Int
    $shares: Int
    $portfolioId: ID!
    $date: String
  ) {
    updateOrder(
      id: $id
      data: {
        action: $action
        ticker: $ticker
        price: $price
        shares: $shares
        portfolio: { connect: { id: $portfolioId } }
        date: $date
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

export default function UpdateOrder({ id }) {
  const user = useUser();
  // 1. Get exisiting order
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
    // update,
  });

  // create some state for the form inputs
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    action: data?.Order.action || "",
    ticker: data?.Order.ticker || "",
    shares: data?.Order.shares || 0,
    price: data?.Order.price || 0,
    date: data?.Order.date || new Date(),
    portfolioId: data?.Order.portfolio.id || "",
  });

  // 2. Get the mutation to update the order
  const [
    updateOrder,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_ORDER_MUTATION, {
    variables: {
      id,
      action: inputs.action,
      ticker: inputs.ticker,
      shares: inputs.shares,
      price: inputs.price,
      date: inputs.date,
      portfolioId: inputs.portfolioId,
    },
    // update,
  });

  console.log("inputs", inputs);
  if (loading || updateLoading) return <p>Loaing...</p>;
  // 3. Need the form to handle the update
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          //   // submit the input fields to the backend
          const res = await updateOrder();
          console.log("updated order", inputs.portfolioId);
          //   clearForm();
          //   inputs.userId = user.id;
        }}
      >
        <h3>Update Your Order</h3>
        <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading}>
          {/* Input for action type */}
          <label htmlFor="action">
            Action:
            <select name="action" value={inputs.action} onChange={handleChange}>
              <option value="">Select one</option>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </label>
          {/* Input for ticker */}
          <label htmlFor="ticker">
            Ticker:
            <input
              required
              type="text"
              id="ticker"
              name="ticker"
              value={inputs.ticker}
              onChange={handleChange}
            />
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
          {/* input for portfolio */}
          <label htmlFor="portfolio">
            Portfolio:
            <select
              name="portfolioId"
              value={inputs.portfolioId}
              onChange={handleChange}
            >
              {/* <option value={null}>Select one</option> */}
              {user &&
                user.portfolios.map((portfolio) => (
                  <option
                    key={portfolio.id}
                    value={portfolio.id}
                    selected={
                      portfolio.id === data.Order.portfolio.id ? "selected" : ""
                    }
                  >
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
                selected={new Date(inputs.date)}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
              />
            </label>
          </div>

          {/* button to clear the form */}
          <button type="submit">Update Order</button>
        </fieldset>
      </Form>
    </div>
  );
}
