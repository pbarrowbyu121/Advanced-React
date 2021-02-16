import React from "react";
// import Order from ".Order";
import Table from "./styles/Table";

export default function PortfolioActivity() {
  return <div>
    Portfolio Activity here!
  </div>

}

// class PortfolioActivity extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let orderList;
//     if (this.props.activity) {
//       orderList = this.props.activity.map((order) => (
//         <Order data={order} key={order.createdAt} />
//       ));
//     } else {
//       orderList = (
//         <tr>
//           <td>Waiting for Data</td>
//         </tr>
//       );
//     }

//     return (
//       <>
//         <Table>
//           <thead>
//             <tr>
//               <th>Ticker</th>
//               <th>Action</th>
//               <th>Shares</th>
//               <th>Price</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>{orderList}</tbody>
//         </Table>
//       </>
//     );
//   }
// }

