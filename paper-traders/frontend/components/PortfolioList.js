import React from "react";
import PortfolioActivity from "./PortfolioActivity";
// import axios from "axios";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Portfolio from "./Portfolio";
import Link from "next/link";
import { CURRENT_USER_QUERY, useUser } from "./User";

function PortfolioList() {
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

export default PortfolioList;
