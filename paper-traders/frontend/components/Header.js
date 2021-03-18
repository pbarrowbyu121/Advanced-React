import Link from "next/link";
import styled from "styled-components";
import React from "react";
import Nav from "./Nav";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 6rem;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  background: var(--green);
  font-family: "Permanent Marker";
  font-weight: normal;
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 5px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  div {
    background-color: var(--gray);
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderStyles>
        <div className="bar">
          <div>
            <Logo>
              <Link href="/">PaperTrader$</Link>
            </Logo>
          </div>

          <Nav />
        </div>
      </HeaderStyles>
    );
  }
}

export default Header;
