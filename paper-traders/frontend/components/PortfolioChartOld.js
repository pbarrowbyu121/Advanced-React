import React from "react";
import * as d3 from "d3";
import { index } from "d3";

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
  }

  drawChart(dataInput) {
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
      .select("div")
      .append("svg")
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
    if (!this.props.data === []) {
      return <div>Waiting for data</div>;
    } else {
      return <div>{this.drawChart(this.props.data)}</div>;
    }
  }
}

export default PortfolioChart;
