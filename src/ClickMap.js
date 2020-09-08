import React, { useState } from "react";
import * as d3 from "d3";
import {
  FormControl,
  Button,
  Container,
  Col,
  Row,
  Modal
} from "react-bootstrap";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import "./ClickMap.css";
import AddModal from "./AddModal"

const ClickMap = () => {

  var width = window.innerWidth,
    height = 400,
    root,
    currentNode,
    charLeng,
    padding = 30;

  var force = d3.layout
    .force()
    .distance(100)
    .gravity(0.05)
    .size([width, height])
    .on("tick", tick)
    .charge(-600);

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);/* 
    .on("dblclick", handleShow); */

  var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll("g");

  d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("style", "position: absolute; opacity: 0;");

  function add() {
    var topic = document.getElementById("topic").value;
    var size = topic.length;

    if (root) {
      var obj = {
        name: topic,
        size: size * 5,
        children: []
      };
      currentNode["children"].push(obj);
    } else {
      root = {
        name: topic,
        size: size * 5,
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
      .data(nodes, function(d) {
        return d.id;
      })
      .style("fill", color);

    // Exit any old nodes.
    node.exit().remove();

    // Enter any new nodes.
    node
      .enter()
      .append("g")
      .attr("class", "test")
      .append("circle")
      .attr("class", "node")
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", function(d) {
        return d.size;
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
      .call(force.drag);

    node
      .append("text")
      .text(function(d) {
        return d.name;
      })
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .style("fill", "Black")
      .on("click", click)
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
      .selectAll("circle")
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });

    node
      .selectAll("text")
      .attr("x", function(d) {
        return d.x - d.size;
      })
      .attr("y", function(d) {
        return d.y;
      });
  }

  // Color leaf nodes orange, and packages white or blue.
  function color(d) {
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
      <Container>
        <Row>
          <Col> 
          <FormControl
                  id="topic"
                  type="text"
                  placeholder="About what do you want to brainstorm?"
          />
            <Button onClick={add}>add</Button>
            <AddModal />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ClickMap;
