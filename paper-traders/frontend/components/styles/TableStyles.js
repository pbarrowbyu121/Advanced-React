import styled from "styled-components";

const TableStyles = styled.table`
  border-spacing: 0;
  width: 100%;
  /* border: 1px solid var(--offWhite); */
  border: 1px solid var(--blue);
  tbody {
    font-size: 15px;
  }
  thead {
    font-size: 20px;
    border-top: solid var(--blue);
    border-top-width: 5rem;
  }
  td,
  th {
    /* border-bottom: 1px solid var(--offWhite); */
    border-bottom: solid var(--blue);
    border-right: solid var(--pencil);
    /* padding: 10px 5px; */
    position: relative;
    &:last-child {
      border-right: none;
      /* width: 150px; */
      /* button {
        width: 50%;
        background-color: var(--red);
        display: block;
        margin: auto;
      } */
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
  th:first-child {
    border-bottom: solid var(--blue);
  }
  thead tr th:first-child,
  tbody tr td:first-child {
    width: 6em;
    border-right-style: double;
    border-right-color: var(--red);
    border-right-width: 0.5rem;
  }
`;

export default TableStyles;
