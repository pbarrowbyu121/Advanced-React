import React from "react";
import * as d3 from "d3";
import { index } from "d3";

const PortfolioChart = ({ data }) => {
  const svg = React.useRef(null);
  console.log("chart data", data);

  React.useEffect(() => {
    if (data.length > 0) {
      d3.selectAll(svg.current).remove().exit();
      drawChart(data, svg);
    }
  }, [svg, data]);

  return (
    <div>
      <svg ref={svg} />
    </div>
  );
};

function drawChart(dataInput, svgRef) {
  console.log("dataInput here", dataInput);
  const h = 500;
  const w = 700;
  const padding = 60;

  // min and max stock prices
  const minStock = d3.min(dataInput, (d) => d.summary.total);
  const maxStock = d3.max(dataInput, (d) => d.summary.total);

  // min and max dates
  const minDate = d3.min(dataInput, (d) => new Date(d.date));
  const maxDate = d3.max(dataInput, (d) => new Date(d.date));

  // x Scale
  const xScale = d3
    .scaleTime()
    .domain([minDate, maxDate])
    .range([padding, w - padding]);

  // y Scale
  const yScale = d3
    .scaleLinear()
    .domain([minStock, maxStock])
    .range([h - padding, padding]);

  // console.log("d3 here", d3);
  const svg = d3
    // .select("div")
    .select(svgRef.current)
    // .append("svg")
    .attr("width", w)
    .attr("height", h);

  // line function for drawing paths
  const line = d3
    .line()
    .x((d) => {
      return xScale(d.date);
    })
    .y((d) => {
      return yScale(d.summary.total);
    });

  // Append the path and bind data
  const path = svg.append("path");
  // console.log("path", dataInput);
  path
    .data([dataInput])
    .style("fill", "none")
    .attr("id", "priceChart")
    .attr("stroke", "green")
    .attr("stroke-width", "1.5")
    .attr("d", line);
  // .attr("d", line(dataInput));

  // add x-axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("dx", "-3.5em")
    .attr("dy", "-.1em")
    .attr("transform", "rotate(-65)")
    .attr("font-family", "Permanent Marker");

  // add y-axis
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis)
    .selectAll("text")
    .attr("font-family", "Permanent Marker");
}

export default PortfolioChart;
