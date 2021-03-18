import styled from "styled-components";

const WatchlistStyles = styled.div`
  background-color: var(--yellow);
  width: 40%;
  margin: auto;
  margin-top: 2rem;
  /* display: grid; */
  /* grid-template-columns: 20% 80%; */

  div {
    height: auto;
  }

  h1 {
    /* background-color: var(--lightGray); */
    border: solid black;
    border-width: 3px 4px 3px 5px;
    border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
    transform: rotate(1deg);
    box-shadow: 3px 3px 0 #222;
    text-align: center;
    margin-left: 1rem;
    margin-right: 5rem;
  }

  .page_head {
    border-bottom: solid;
    border-color: var(--blue);
    display: grid;
    grid-template-columns: 20% 80%;
  }

  .page_margin {
    /* border-bottom: solid;
    border-bottom-color: var(--blue); */

    border-right-style: double;
    border-right-color: var(--red);
    border-right-width: 0.5rem;
  }

  .watchlist {
    height: auto;
  }

  .watchlistItem {
    border-bottom: solid;
    border-color: var(--blue);
    display: grid;
    grid-template-columns: 20% 80%;
    /* height: 4rem; */
    /* gap: 0; */
    /* line-height: 1em; */
  }
  .righthand_side {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .symbol {
    margin-left: 2rem;
    /* margin-top: 2rem; */
    /* margin: 0rem; */
  }

  .last_price {
    /* width: 50%; */
    /* height: 40%; */
    /* text-align: center; */
    justify-content: center;
    /* margin: auto; */

    p {
      background: url("../static/circle_sketch.PNG");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      width: 50%;
      margin-left: 3rem;
      /* border: 10px solid; */
    }

    /* margin: 0rem; */
  }
`;

export default WatchlistStyles;
