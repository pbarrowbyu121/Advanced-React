import React from "react";
import Link from "next/link";

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link href="/createuser">Create User</Link>
        <Link href="/stocksearch">Stock Search</Link>
        <Link href="/neworder">New Order</Link>
        <Link href="/portfolios">Portfolios</Link>
      </nav>
    );
  }
}

export default Nav;
