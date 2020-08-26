import React from "react";
import * as d3 from "d3";
import { FormControl, Button } from "react-bootstrap";
import "./ClickMap.css";

const ClickMap = () => {
  var width = 400,
    height = 400,
    root,
    currentNode;

  var force = d3.layout
    .force()
    .size([width, height])
    .on("tick", tick);

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

  d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("style", "position: absolute; opacity: 0;");

  function add() {
    var topic = document.getElementById("topic").value;
    if (root) {
      var obj = {
        name: topic,
        size: Math.random() * 10000,
        children: []
      };
      currentNode["children"].push(obj);
    } else {
      root = {
        name: topic,
        size: Math.random() * 10000,
        children: []
      };
      currentNode = root;
    }
    update();
  }

  function update() {
    var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
      .nodes(nodes)
      .links(links)
      .start();

    // Update the links…
    link = link.data(links, function(d) {
      return d.target.id;
    });

    // Exit any old links.
    link.exit().remove();

    // Enter any new links.
    link
      .enter()
      .insert("line", ".node")
      .attr("class", "link")
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

    // Update the nodes…
    node = node
      .selectAll("g")
      .data(nodes, function(d) {
        return d.id;
      })
      .style("fill", color);

    // Exit any old nodes.
    node.exit().remove();

    /*Create and place the "blocks" containing the circle and the text */

    var elemEnter = node
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + d.x + ",80)";
      });
    // Enter any new nodes.

    elemEnter
      .append("circle")
      .attr("class", "node")
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", function(d) {
        return Math.sqrt(d.size) / 10 || 4.5;
      })
      .style("fill", color)
      .on("mouseover", function(d) {
        console.log(d);
        d3.select("#tooltip")
          .transition()
          .duration(200)
          .style("opacity", 1)
          .text(d.name);
      })
      .on("mouseout", function() {
        d3.select("#tooltip").style("opacity", 0);
      })
      .on("click", click)
      .append("p")
      .text(d => {
        return d.name;
      })
      .style("style")
      .call(force.drag);
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

  // Color leaf nodes orange, and packages white or blue.
  function color(d) {
    // hide and show color statement: d._children ? "#3182bd" :
    return d.children.length ? "#c6dbef" : "#fd8d3c";
  }

  // Toggle children on click.
  function click(d) {
    currentNode = d;
  }

  // Returns a list of all nodes under the root.
  function flatten(root) {
    var nodes = [],
      i = 0;
    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id || node.id) node.id = ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }
  return (
    <div>
      <FormControl id="topic" type="text" />
      <Button onClick={add}>add</Button>
    </div>
  );
};
export default ClickMap;
