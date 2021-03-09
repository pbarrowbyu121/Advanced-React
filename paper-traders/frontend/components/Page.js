import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { getPortfolioPerformance } from "../lib/getPortfolioPerformance";
import React, { useContext, useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { useUser } from "./User";
import { UserContext, UserProvider } from "../contexts/UserContext";
import { TSLA_response, AMZN_response, AAPL_response } from "../lib/dummyData";
import { portfolioSummary } from "../lib/portfolioFunctions";
import getStockData from "../lib/getStockData";

// const stockAPIData = [TSLA_response, AMZN_response, AAPL_response];

const GlobalStyles = createGlobalStyle`
 html {
    --red: #c74b55;
    --black: #393939;
    --grey: #3A3A3A;
    --green: #55c74b;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Permanent Marker', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'Permanent Marker', sans-serif;
  }
  `;

function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <UserProvider>
        <Header />
        {children}
        <Footer />
      </UserProvider>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
