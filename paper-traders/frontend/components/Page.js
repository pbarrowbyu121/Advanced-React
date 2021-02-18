import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";

function Page({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
