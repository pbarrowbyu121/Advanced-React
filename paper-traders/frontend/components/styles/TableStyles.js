import styled from "styled-components";

const TableStyles = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid var(--offWhite);
  tbody {
    font-size: 15px;
  }
  thead {
    font-size: 20px;
  }
  td,
  th {
    border-bottom: 1px solid var(--offWhite);
    border-right: 1px solid var(--offWhite);
    padding: 10px 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 50%;
        background-color: var(--red);
        display: block;
        margin: auto;
      }
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

export default TableStyles;
