import React from "react";
import * as d3 from "d3";
import { FormControl, Button } from "react-bootstrap";
import "./ForceV5.css";

const ForceV5 = () => {
  
  // Read data
  const data = {
    name: "root",
    children: [
      /* { name: "child #1" },
      {
        name: "child #2",
        children: [
          { name: "grandchild #1" },
          { name: "grandchild #2" },
          { name: "grandchild #3" }
        ]
      } */
    ]
  };
  const height = 600;
  const width = 800;
  const root = d3.hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();

  console.log(nodes);
  var currentNode = root;

  var simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id(d => d.id)
        .distance(0)
        .strength(-100)
    )
    .force("charge", d3.forceManyBody().strength(-50))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  //invalidation.then(() => simulation.stop());
  function add() {
    var topic = document.getElementById("topic").value;
    var size = topic.length;
    var obj = {
      name: topic,
      size: size * 4,
      children: []
    };
    data["children"].push(obj);
    root = d3.hierarchy(data);
    nodes = root.descendants();
    currentNode = root;
    document.getElementById("topic").value = "";
    svg.data(nodes);
    update();
  }

  function update() {
    /* var nodes = flatten(root), */
    /* links = d3.layout.tree().links(nodes); */
    links = root.links();
    //console.log(links);
    console.log(nodes);
    //console.log(data);

    /*    force
      .nodes(nodes)
      .links(links)
      .start(); */
    //d3.forceLink(links);
    simulation.nodes(nodes);
    simulation.restart();

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", d => (d.children ? null : "#000"))
      .attr("stroke", d => (d.children ? null : "#fff"))
      .attr("r", 3.5)
      .call(
        d3
          .drag() // call specific function when circle is dragged
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0.03);
      d.fx = null;
      d.fy = null;
    }

    node.append("title").text(d => d.dataname);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x).attr("cy", d => d.y);
      node
        .append("text")
        .text(function(d) {
          return d.name;
        })
        .attr("x", function(d) {
          return d.x - d.size;
        })
        .attr("y", function(d) {
          return d.y;
        })
        .on("click", click)
        .call(
          d3
            .drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
    });
  }
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
  function click(d) {
    currentNode = d;
  }
  return (
    <div>
      <FormControl id="topic" type="text" />
      <Button  id="addBtn" onClick={add}>add</Button>
    </div>
  );

  //return svg.node();
};
export default ForceV5;
