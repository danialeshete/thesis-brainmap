import React from "react";
import * as d3 from "d3";
import { FormControl, Button } from "react-bootstrap";
import "./ForceV3.css";

const ForceV3 = () => {
  var width = 960,
    height = 500,
    curserSize = 100;

  var fill = d3.scale.category20();

  var force = d3.layout
    .force()
    .size([width, height])
    .nodes([{}]) // initialize with a single node
    .linkDistance(100)
    .charge(-60)
    .on("tick", tick);

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedownCanvas);

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  var nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

  var cursor = svg
    .append("circle")
    .attr("r", curserSize)
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

  restart();

  function mousemove() {
    cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
  }

  function mousedownCanvas() {
    var point = d3.mouse(this),
      node = { x: point[0], y: point[1] },
      n = nodes.push(node);


    // add links to any nearby nodes
    nodes.forEach(function(target) {
      var x = target.x - node.x,
        y = target.y - node.y;
      if (Math.sqrt(x * x + y * y) < curserSize) {
        links.push({ source: node, target: target });
      }
    });

    restart();
  }

  function mousedownNode(d, i) {
    nodes.splice(i, 1);
    links = links.filter(function(l) {
      return l.source !== d && l.target !== d;
    });
    // d3.event.stopPropagation();   //Entfernen der Nodes
    restart();

  }

  function tick() {
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  }

  function restart() {
    node = node.data(nodes);

    node
      .enter()
      .insert("circle", ".cursor")
      .attr("class", "node")
      .attr("r", 5)
      .on("mousedown", () => {
        mousedownNode;
      });

    node.exit().remove();

    link = link.data(links);

    link
      .enter()
      .insert("line", ".node")
      .attr("class", "link");
    link.exit().remove();

    force.start();
  }
  function add() {}

  return (
    <div>
      <FormControl id="topic" type="text" />
      <Button id="addBtn" onClick={add}>
        add
      </Button>
    </div>
  );
};
export default ForceV3;
