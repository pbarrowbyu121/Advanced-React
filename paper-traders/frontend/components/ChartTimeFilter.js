import React from "react";
import useForm from "../lib/useForm";
import ChartTimeFilterStyles from "./styles/ChartTimeFilterStyles";

export default function ChartTimeFilter({ handler, checkedValue }) {
  console.log(checkedValue);
  return (
    <div class="chart-filter">
      <label>
        1w
        <input
          type="radio"
          name="timeLine"
          value={5}
          onChange={handler}
          checked={checkedValue === 5 ? "checked" : null}
        />
      </label>
      <label>
        1m
        <input
          type="radio"
          name="timeLine"
          value={21}
          onChange={handler}
          checked={checkedValue === 21 ? "checked" : null}
        />
      </label>
      <label>
        1y
        <input
          type="radio"
          name="timeLine"
          value={252}
          onChange={handler}
          checked={checkedValue === 252 ? "checked" : null}
        />
      </label>
      <label>
        ALL
        <input
          type="radio"
          name="timeLine"
          value={"ALL"}
          onChange={handler}
          checked={checkedValue === "ALL" ? "checked" : null}
        />
      </label>
      {/* <div>Timeline: {timeLineState}</div> */}
    </div>
  );
}
