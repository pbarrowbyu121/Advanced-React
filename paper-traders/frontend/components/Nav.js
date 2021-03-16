import React from "react";
import Link from "next/link";
import { useUser } from "./User";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";

export default function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      {/* this stuff shows if user is logged in */}
      {user && (
        <>
          <Link href="/stocksearch">$tock $earch</Link>
          <Link href="/watchlist">Watchli$t</Link>
          <Link href="/portfolios">Portfolio$</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">$ign In</Link>
        </>
      )}
    </NavStyles>
  );
}
