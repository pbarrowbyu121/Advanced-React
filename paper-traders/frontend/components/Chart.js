import React from "react";
import * as d3 from "d3";
import { index } from "d3";

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  drawChart(dataInput) {
    const h = 500;
    const w = 700;
    const padding = 60;

    // min and max stock prices
    const minStock = d3.min(dataInput, (d) => d.c);
    const maxStock = d3.max(dataInput, (d) => d.c);

    // min and max dates
    const minDate = d3.min(dataInput, (d) => new Date(d.t));
    const maxDate = d3.max(dataInput, (d) => new Date(d.t));

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

    const svg = d3
      .select("div")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // line function for drawing paths
    const line = d3
      .line()
      .x((d) => {
        return xScale(d.t);
      })
      .y((d) => {
        return yScale(d.c);
      });

    // Append the path and bind data
    svg
      .append("path")
      .data(dataInput)
      .style("fill", "none")
      .attr("id", "priceChart")
      .attr("stroke", "green")
      .attr("stroke-width", "1.5")
      .attr("d", line(dataInput));

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
      .attr("transform", "rotate(-65)");

    // add y-axis
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);
  }

  componentDidUpdate() {
    d3.selectAll("svg").remove().exit();
    this.drawChart(this.props.data);
  }

  componentWillUnmount() {
    d3.selectAll("svg").remove().exit();
  }

  render() {
    return <div>{this.drawChart(this.props.data)}</div>;
  }
}

export default Chart;
