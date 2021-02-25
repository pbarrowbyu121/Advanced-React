import styled from "styled-components";

const NewPortfolioStyles = styled.tr`
  border-spacing: 0;
  width: 100%;
  border: 1px solid var(--offWhite);
  tbody {
    font-size: 15px;
  }
  thead {
    font-size: 20px;
  }

  /* td,
  th, */
  #new_portfolio {
    /* border: 1px solid var(--offWhite); */
    /* border-bottom: 1px solid var(--offWhite); */
    /* border-right: 1px solid var(--offWhite); */
    /* padding: 10px 5px; */
    display: flex;

    border-width: 0px;
    border-style: none;
    border-color: transparent;
    padding: 0px;
    position: relative;
    #add_portfolio_button {
      /* width: 50%; */
      /* width: 100%; */
      background-color: var(--green);
      display: block;
      /* margin: auto; */
    }
  }

  tr {
    &:hover {
      background: var(--offWhite);
    }
  }
  th {
    border-bottom: 2px solid var(--black);
  }
`;

export default NewPortfolioStyles;
