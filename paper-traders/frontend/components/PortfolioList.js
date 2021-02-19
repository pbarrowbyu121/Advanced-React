import React from "react";
import PortfolioActivity from "./PortfolioActivity";
// import axios from "axios";
import PortfolioPerformance from "./PortfolioPerformanceOrig";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Portfolio from "./Portfolio";
import Link from "next/link";
import { CURRENT_USER_QUERY, useUser } from "./User";

// const ALL_PORTFOLIOS_QUERY = gql`
//   query ALL_PORTFOLIOS_QUERY {
//     allPortfolios {
//       id
//       name
//       user {
//         name
//       }
//       orders {
//         action
//         ticker
//         price
//         shares
//         date
//       }
//     }
//   }
// `;

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
  const user = useUser();
  if (!user) return null;

  return (
    <div>
      {user.portfolios.map((portfolio) => (
        <div key={portfolio.id}>
          <Link href={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
          <p>final amount here</p>
        </div>
      ))}
    </div>
  );
}
// }

export default Portfolios;
