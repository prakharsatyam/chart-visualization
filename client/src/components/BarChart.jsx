/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Query from '../utils/Query';
import { useDataStore } from '../utils/store';

const BarChartBase = ({ data, valueAtY, onBarClick }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    // Aggregate data by valueAtY field
    const aggregatedData = d3.groups(data, d => d[valueAtY])
      .map(([key, articles]) => ({
        [valueAtY]: key,
        count: articles.length,
        articles
      }));

    // Clear previous SVG content before re-rendering
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Tooltip div
    const tooltip = d3.select(tooltipRef.current);

    const barHeight = 35; // Increased bar height for easier clicking
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 10;
    const marginLeft = 120; // Increased left margin for better spacing
    const width = 1000;
    const height = Math.ceil((aggregatedData.length + 0.1) * barHeight) + marginTop + marginBottom;

    // Calculate the maximum value for count
    const maxValue = d3.max(aggregatedData, d => d.count);

    // Create the scales
    const x = d3.scaleLinear()
      .domain([0, Math.ceil(maxValue / 10) * 10])
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleBand()
      .domain(d3.sort(aggregatedData, d => -d.count).map(d => d[valueAtY]))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

    // Create a value format
    const format = x.tickFormat(100, "");

    // Create the SVG container
    svg.attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "max-w-full h-auto font-sans");

    // Append a rect for each item
    svg.append("g")
      .selectAll("rect")
      .data(aggregatedData)
      .join("rect")
      .attr("x", d => x(Math.min(d.count, 1))) // Adjust x position dynamically based on count
      .attr("y", d => y(d[valueAtY]))
      .attr("width", d => Math.max(x(d.count) - x(0), 10)) // Set a minimum width of 10 pixels
      .attr("height", y.bandwidth())
      .attr("fill",'rgba(34, 197, 94)') // Adjust gradient based on maxValue
      .on("mouseover", function (event, d) {
        const rect = d3.select(this);
        rect.transition()
          .duration(200) // Set the duration of the animation
          .attr("width", width - marginLeft - marginRight) // Expand the width to fill the column
          .attr("x", marginLeft); // Move the bar to the left margin
        const [xPosition, yPosition] = d3.pointer(event);
        tooltip.style("opacity", 1)
          .html(`${valueAtY}: ${d[valueAtY]}`)
          .style("left", `${xPosition + 10}px`)
          .style("top", `${yPosition - 10}px`);
      })
      .on("mousemove", (event) => {
        const [xPosition, yPosition] = d3.pointer(event);
        tooltip.style("left", `${xPosition }px`)
          .style("top", `${yPosition}px`);
      })
      .on("mouseout", function () {
        const rect = d3.select(this);
        rect.transition()
          .duration(200) // Set the duration of the animation
          .attr("width", d => Math.max(x(d.count) - x(0), 10)) // Restore original width
          .attr("x", d => x(Math.min(d.count, 1))); // Restore original x position
        tooltip.style("opacity", 0);
      })
      .on("click", (event, d) => {
        onBarClick(d);
      });

    // Append a label for each item
    svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(aggregatedData)
      .join("text")
      .attr("x", d => x(Math.max(d.count, 1))) // Adjust label x position dynamically based on count
      .attr("y", d => y(d[valueAtY]) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => format(d.count))
      .call(text => text.filter(d => x(d.count) - x(0) < 20) // short bars
        .attr("dx", 4)
        .attr("fill", "white")
        .attr("text-anchor", "start"));

    // Create the axes
    svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80))
      .call(g => g.select(".domain").remove());

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => `${d}`));

  }, [data, valueAtY]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className="absolute bg-gray-800 text-white p-2 rounded shadow-lg opacity-0 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

function BarChart() {
  const data = useDataStore((state) => state.data);
  const [selectedData, setSelectedData] = useState(null);
  const [valueAtY, setValueAtY] = useState("intensity"); // Default valueAtY

  const handleBarClick = (d) => {
    setSelectedData(d);
  };

  const handleChangeValueAtY = (event) => {
    setValueAtY(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6"> Documents vs {valueAtY.charAt(0).toUpperCase() + valueAtY.slice(1)}</h1>
        <div className="flex justify-center mb-4">
          <select
            value={valueAtY}
            onChange={handleChangeValueAtY}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <option value="intensity">Intensity</option>
            <option value="likelihood">Likelihood</option>
            <option value="relevance">Relevance</option>
            <option value="end_year">End Year</option>
            <option value="start_year">Start Year</option>
            <option value="country">Country</option>
            <option value="pestle">Topics</option>
            <option value="region">Region</option>
            <option value="source">Source</option>
          </select>
        </div>
        <Query querykey="data" v1url="data" />
        <div className="flex justify-center">
          <BarChartBase data={data} valueAtY={valueAtY} onBarClick={handleBarClick} />
        </div>
      </div>
      {selectedData && selectedData.articles && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
          <h2 className="text-2xl font-bold mb-4">{`${valueAtY.charAt(0).toUpperCase() + valueAtY.slice(1)} for ${valueAtY}: ${selectedData[valueAtY]}`}</h2>
          <ul>
            {selectedData.articles.map(article => (
              <li key={article._id} className="mb-2 py-2 px-4 bg-gray-700 rounded-lg shadow-md text-white">
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BarChart;
