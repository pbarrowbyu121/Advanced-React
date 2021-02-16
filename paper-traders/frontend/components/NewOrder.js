import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const NEW_ORDER_MUTATION = gql`
  mutation NEW_ORDER_MUTATION(
    # which variables are passed in and types
    $action: String!
    $ticker: String!
    $shares: Int!
    $price: Int!
    $date: String!
  ) {
    createOrder(
      data: {
        action: $action
        ticker: $ticker
        price: $price
        shares: $shares
        date: $date
      }
    ) {
      id
    }
  }
`;

export default function NewOrder() {
  const { inputs, handleChange, handleDateChange, clearForm } = useForm({
    action: "buy",
    ticker: "",
    shares: 0,
    price: 0,
    date: "",
  });
  const [createOrder, { loading, error, data }] = useMutation(
    NEW_ORDER_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <div>
      <h3>New Order</h3>
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
          {/* Input for action type */}
          <label htmlFor="action">
            Action:
            <select name="action" value={inputs.action} onChange={handleChange}>
              <option value="buy">BUY</option>
              <option value="sell">SELL</option>
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
          <button type="submit">Execute Order</button>
        </fieldset>
      </form>
    </div>
  );
  {
    /* <div>
         <h3>New Order</h3>
         <form >
           <div>
             <label>Date: </label>
             <DatePicker
               name="date"
               selected={this.state.date}
               onChange={this.handleDateChange}
             />
           </div>
           <div>
             <input type="submit" value="Execute Order" />
           </div>
         </form>
         <button onClick={this.handleFeedback}>Feedback</button> */
  }
}

// class NewOrder extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     username: "",
//     action: "",
//     ticker: "",
//     shares: 0,
//     price: 0,
//     date: new Date(),
//     portfolio: "",
//   };
// }

// // handler for change in inputs
// handleChange = (event) => {
//   const value = event.target.value;
//   this.setState({
//     ...this.state,
//     [event.target.name]: value,
//   });
// };

// // handler for change in date input
// handleDateChange = (date) => {
//   this.setState({
//     date: date,
//   });
// };

// handler for submitting username
// onSubmit = (e) => {
//   e.preventDefault();

//   const order = {
//     username: this.state.username,
//     action: this.state.action,
//     ticker: this.state.ticker,
//     shares: Number(this.state.shares),
//     price: Number(this.state.price),
//     date: this.state.date,
//     portfolio: this.state.portfolio,
//   };

//   console.log(order);
//   // axios
//   //   .post("http://localhost:5000/order/add", order)
//   //   .then((res) => console.log(res.data));

//   this.setState({
//     username: "",
//     action: "",
//     ticker: "",
//     shares: 0,
//     price: 0,
//     date: new Date(),
//     portfolio: "",
//   });
// };

// // Currently a dummy function to test input and output
// handleFeedback = (event) => {
//   console.log(this.state);
// };

// render() {
//   return (
//
//   );
// }
// }
