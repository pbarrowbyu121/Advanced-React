import React from "react";
import Link from "next/link";
import { useUser } from "./User";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";

export default function Nav() {
  const user = useUser();
  // console.log(user);
  return (
    <NavStyles>
      {/* this stuff shows if user is logged in */}
      {user && (
        <>
          <Link href="/stocksearch">Stock Search</Link>
          <Link href="/neworder">New Order</Link>
          <Link href="/portfolios">Portfolios</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
