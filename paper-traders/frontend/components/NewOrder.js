import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

class NewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      action: "",
      ticker: "",
      shares: 0,
      price: 0,
      date: new Date(),
      portfolio: "",
    };
  }

  // handler for change in inputs
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  // handler for change in date input
  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  // handler for submitting username
  onSubmit = (e) => {
    e.preventDefault();

    const order = {
      username: this.state.username,
      action: this.state.action,
      ticker: this.state.ticker,
      shares: Number(this.state.shares),
      price: Number(this.state.price),
      date: this.state.date,
      portfolio: this.state.portfolio,
    };

    console.log(order);
    // axios
    //   .post("http://localhost:5000/order/add", order)
    //   .then((res) => console.log(res.data));

    this.setState({
      username: "",
      action: "",
      ticker: "",
      shares: 0,
      price: 0,
      date: new Date(),
      portfolio: "",
    });
  };

  // Currently a dummy function to test input and output
  handleFeedback = (event) => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h3>New Order</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              required
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Buy/Sell: </label>
            <input
              type="text"
              required
              name="action"
              value={this.state.action}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Ticker: </label>
            <input
              type="text"
              required
              name="ticker"
              value={this.state.ticker}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Shares: </label>
            <input
              type="number"
              required
              name="shares"
              value={this.state.shares}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Price: </label>
            <input
              type="number"
              required
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Date: </label>
            <DatePicker
              name="date"
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
          </div>
          <div>
            <label>Portfolio: </label>
            <input
              type="text"
              required
              name="portfolio"
              value={this.state.portfolio}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Execute Order" />
          </div>
        </form>
        <button onClick={this.handleFeedback}>Feedback</button>
      </div>
    );
  }
}

export default NewOrder;
