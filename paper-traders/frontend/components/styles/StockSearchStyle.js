import styled from "styled-components";

const StockSearchStyle = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  background-color: var(--yellow);

  margin: auto;
  margin-top: 2rem;
  width: 80%;
  flex-shrink: 0;

  h1 {
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: solid black;
    border-width: 3px 4px 3px 5px;
    border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
    transform: rotate(1deg);
    box-shadow: 3px 3px 0 #222;
    text-align: center;
    width: 50%;
  }

  .page-head {
    border-bottom: solid;
    border-color: var(--blue);
    display: grid;
    grid-template-columns: 15% 85%;
  }

  .page-margin {
    /* border-bottom: solid;
    border-bottom-color: var(--blue); */
    border-right-style: double;
    border-right-color: var(--red);
    border-right-width: 0.5rem;
  }

  .notebook-top {
    background-color: gray;
    height: 4rem;

    margin: auto;
    margin-top: 3rem;
    width: 100%;
  }
  .page-row {
    border-bottom: solid;
    border-bottom-color: var(--blue);
    display: grid;
    grid-template-columns: 15% 80%;
    height: 3.5rem;
  }
  .search-param {
    label {
      margin-left: 2rem;
    }

    input {
      margin-left: 4rem;
    }
  }

  .chart-title {
    margin: auto;
  }

  .righthand-side {
    button {
      margin-left: 2rem;
    }
  }

  .chart-filter-row {
    margin: auto;
    width: 40%;
  }
  .chart-filter {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    width: 100%;
    padding-left: 1rem;
  }
`;

export default StockSearchStyle;
