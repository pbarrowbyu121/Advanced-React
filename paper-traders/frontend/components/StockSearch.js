import { timeHours } from "d3";
import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import SearchParam from "./SearchParam";

// const API_key = process.env.API_KEY;
const API_key = "O1F92HXG7p_OFdN7G7RZsaTZd_Or7pEi";

class StockSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      beg_date: "",
      end_date: "",
      items: "",
      //   url: "",
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

  handleGetData = (event) => {
    let url =
      "https://api.polygon.io/v2/aggs/ticker/" +
      this.state.ticker +
      "/range/1/day/" +
      this.state.beg_date +
      "/" +
      this.state.end_date +
      "?apiKey=" +
      API_key;

    // console.log(this.state);
    // console.log(url);

    // fetch the api data
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json.results,
        });
      });
  };

  // Currently a dummy function to test input and output
  handleFeedback = (event) => {
    console.log(this.state);
  };

  render() {
    let chartComponent;
    if (this.state.items) {
      chartComponent = <Chart data={this.state.items} />;
    } else {
      chartComponent = <p>Waiting for Data</p>;
    }

    return (
      <div>
        <h1>Stock Search</h1>
        <SearchParam
          fieldName="Ticker"
          name="ticker"
          placeholder="XXXX"
          onChange={this.handleChange}
        />
        <SearchParam
          fieldName="Beginning"
          name="beg_date"
          placeholder="YYYY-MM-DD"
          onChange={this.handleChange}
        />
        <SearchParam
          fieldName="Ending"
          name="end_date"
          placeholder="YYYY-MM-DD"
          onChange={this.handleChange}
        />
        <button onClick={this.handleGetData}>Get Data</button>
        {chartComponent}
      </div>
    );
  }
}

export default StockSearch;
