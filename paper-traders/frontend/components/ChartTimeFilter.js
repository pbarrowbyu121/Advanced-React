import React from "react";
import useForm from "../lib/useForm";
import ChartTimeFilterStyles from "./styles/ChartTimeFilterStyles";

export default function ChartTimeFilter({ handler, checkedValue }) {
  console.log(checkedValue);
  return (
    <ChartTimeFilterStyles>
      <label>1w</label>
      <input
        type="radio"
        name="timeLine"
        value={5}
        onChange={handler}
        checked={checkedValue === 5 ? "checked" : null}
      />
      <label>1m</label>
      <input
        type="radio"
        name="timeLine"
        value={21}
        onChange={handler}
        checked={checkedValue === 21 ? "checked" : null}
      />
      <label>1y</label>
      <input
        type="radio"
        name="timeLine"
        value={252}
        onChange={handler}
        checked={checkedValue === 252 ? "checked" : null}
      />
      <label>ALL</label>
      <input
        type="radio"
        name="timeLine"
        value={"ALL"}
        onChange={handler}
        checked={checkedValue === "ALL" ? "checked" : null}
      />
      {/* <div>Timeline: {timeLineState}</div> */}
    </ChartTimeFilterStyles>
  );
}
