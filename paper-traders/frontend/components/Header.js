import Link from "next/link";
import React from "react";
import Nav from "./Nav";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="bar">
          <Link href="/">PaperTraders</Link>
        </div>

        <Nav />
      </header>
    );
  }
}

export default Header;
