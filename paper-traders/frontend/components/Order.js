import React from "react";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client";

const ALL_ORDERS_QUERY = gql`
query ALL_ORDERS_QUERY {
  allOrders {
    action
    ticker
    price
    shares
    user {
      name
    }
    portfolio {
      name
    }
    date
  }
}
`;

function Order({order}) {
  const { data, error, loading } = useQuery(ALL_ORDERS_QUERY);
  console.log("here", data, error, loading)

  // put loading component here
  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error.message}</p>

  return (
    <div>
      <tr>
        <td>{order.action}</td>
        <td>{order.ticker}</td>
        <td>{order.price}</td>
        <td>{order.shares}</td>
        <td>{order.date}</td>
      </tr>
    </div>
  )
      }

// class Order extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {

//     let orderComponent;
//     if (this.props.data) {
//       orderComponent = (
//         <>
//           <tr key={this.props.data.createdAt}>
//             <td>{this.props.data.ticker}</td>
//             <td>{this.props.data.action}</td>
//             <td>{this.props.data.shares}</td>
//             <td>{this.props.data.price}</td>
//             <td>{format(new Date(this.props.data.date), "yyyy-MM-dd")}</td>
//           </tr>
//         </>
//       );
//     } else {
//       orderComponent = <tr key="01">No Order</tr>;
//     }
//     return <>{orderComponent}</>;
//   }
// }

export default Order;
