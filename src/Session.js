import React from "react";
import * as d3 from "d3";

const Session = () => {
  var w = window.innerWidth;
  var h = 500;

  /*   var svg = d3.select("svg"); //selektiert die svg element mit class (plot) in main.html
   */
  var svg = d3
    .select("body") //variable svg soll eine svg element in body kreieren aber kreiert stattdessen zwei auf Meteor+React
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var connections = [];

  function drawCircle(x, y, size) {
    console.log("Drawing circle at", x, y, size);

    svg
      .append("circle")
      .attr("class", "click-circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", size)
      .style("cursor", "pointer")
      .call(d3.drag().on("drag", dragmove));

    connections.push({
      midpoint_x: (x + size) / 2,
      midPoint_y: (y + size) / 2
    });
    console.log(connections)
  }
  function drawEdges() {
    svg
      .append("line")
      .style("stroke", "black")
      .attr("x1", 150)
      .attr("y1", 100)
      .attr("x2", 250)
      .attr("y2", 300);
  }

  function dragmove(d) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this)
      .attr("cx", x)
      .attr("cy", y);
  }

  svg.on("dblclick", function() {
    //double Click to create Circle
    var coords = d3.mouse(this);
    drawCircle(coords[0], coords[1], 30);
  });

  return <div />;
};

export default Session;
