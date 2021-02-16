import React from "react";
import PortfolioActivity from "./PortfolioActivity";
// import axios from "axios";
import PortfolioPerformance from "./PortfolioPerformance";
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client";
import Portfolio from "./Portfolio";
import Link from 'next/link'

// const ALL_ORDERS_QUERY = gql`
// query ALL_ORDERS_QUERY {
//   allOrders {
//     action
//     ticker
//     price
//     shares
//     user {
//       name
//     }
//     portfolio {
//       name
//     }
//     date
//   }
// }
// `;

const ALL_PORTFOLIOS_QUERY = gql`
query ALL_PORTFOLIOS_QUERY {
  allPortfolios {
    name
    user {
      name
    }
    orders {
      action
      ticker
      price
      shares
      date
    }
  }
}
`;

// beg_date and end_date are unix codes
// class Portfolio extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: "",
//       portfolio: "",
//       portfolioActivity: "",
//       tickers: [],
//       beg_date: "",
//       end_date: "",
//     };
//   }

//   // handler for change in inputs
//   handleChange = (event) => {
//     const value = event.target.value;
//     this.setState({
//       [event.target.name]: value,
//     });
//   };

//   handleGetPortfolioData = (e) => {
//     e.preventDefault();

//     console.log(user);

//     // // get all orders
//     // axios
//     //   .get(
//     //     "http://localhost:5000/order/user/" +
//     //       this.state.user +
//     //       "/portfolio/" +
//     //       this.state.portfolio
//     //   )
//     //   // sort the data so earliest is
//     //   .then((res) => {
//     //     let sortedArray = res.data.sort(
//     //       (a, b) => new Date(b.date) - new Date(a.date)
//     //     );
//     //     this.setState({
//     //       beg_date: sortedArray[sortedArray.length - 1].unix_date,
//     //       end_date: sortedArray[0].unix_date,
//     //       portfolioActivity: sortedArray,
//     //     });
//     //     // console.log(sortedArray);
//     //   });

//     // // get unique tickers
//     // axios
//     //   .get(
//     //     "http://localhost:5000/order/ticker/" +
//     //       this.state.user +
//     //       "/" +
//     //       this.state.portfolio
//     //   )
//     //   .then((res) => {
//     //     this.setState({
//     //       tickers: res.data.filter((i) => i !== "$CASH"),
//     //     });
//     //     console.log(res.data);
//     //   });
//   };

//   handleFeedback = (e) => {
//     // console.log(this.state.portfolioActivity)
//     console.log(this.state.end_date);
//   };



  function Portfolios() {
    const { data, error, loading } = useQuery(ALL_PORTFOLIOS_QUERY);
    console.log("here", data, error, loading)

    // put loading component here
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>

    // let activityComponent;
    return (
      <div>
        {data.allPortfolios.map((portfolio) => (
        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}
        </Link>

        ))}
        
      </div>
      // <div>
      //   <p>Portfolio</p>
      //   <label htmlFor="user">
      //     User:
      //     <input
      //       id="user"
      //       name="user"
      //       placeholder="username"
      //       onChange={this.handleChange}
      //     ></input>
      //   </label>
      //   <label htmlFor="portfolio">
      //     Portfolio:
      //     <input
      //       id="portfolio"
      //       name="portfolio"
      //       placeholder="Portfolio"
      //       onChange={this.handleChange}
      //     ></input>
      //   </label>
      //   <button onClick={this.handleGetPortfolioData}>Get Activity</button>
      //   <button onClick={this.handleFeedback}>Feedback</button>
      //   {/* {activityComponent} */}
      //   <PortfolioActivity activity={this.state.portfolioActivity} />
      //   <PortfolioPerformance
      //     activity={this.state.portfolioActivity}
      //     tickers={this.state.tickers}
      //     beg_date={this.state.beg_date}
      //     end_date={this.state.end_date}
      //   />
      // </div>
    );
  }
// }

export default Portfolios;
