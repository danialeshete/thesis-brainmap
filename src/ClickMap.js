import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import {
  FormControl,
  Button,
  Container,
  Col,
  Row,
  Modal,
  Form
} from "react-bootstrap";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { CirclePicker } from "react-color";

import "./ClickMap.css";

const ClickMap = () => {
  React.useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", root);
  }, [root]);

  var width = window.innerWidth,
    height = window.innerHeight - 200,
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
    .append("div")
    .attr("class", "container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  var link = svg.append("g").selectAll(".link"), //create Group of  Lines in SVG
    node = svg.append("g").selectAll("g");

  d3.select("#app")
    .append("div")
    .attr("id", "tooltip")
    .attr("style", "position: absolute; opacity: 0;");

  function add() {
    var topic = document.getElementById("topic").value;
    var size = topic.length * 5;
    if (topic != "") {
      if (root) {
        var obj = {
          name: topic,
          size: size,
          children: [],
          colorID: "#00b4d8"
        };
        currentNode["children"].push(obj);
      } else {
        root = {
          name: topic,
          size: size,
          children: [],
          colorID: "#caf0f8"
        };
        currentNode = root;
      }
      update();
      document.getElementById("topic").value = "";
      document.getElementById("topic").placeholder =
        "What are your Ideas to the topic?";
    } else {
    }
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
      .style("fill", d => d.colorID);

    // Exit any old nodes.
    node.exit().remove();

    // Enter any new nodes.
    node
      .enter()
      .append("g")
      .attr("class", "circle")
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
      .style("fill", d => d.colorID)
      .on("mouseover", function(d) {
        d3.select("#tooltip")
          .transition()
          .duration(200)
          .style("opacity", 1)
          .text(d.name);
      })
      .on("mouseout", function() {
        d3.select("#tooltip").style("opacity", 0);
      })
      .on("click", clickNode)
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
      .on("click", clickNode)
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
    return d.children.length ? "#a8dadc" : "#a8dadc";
  }

  // Toggle children on click.
  function clickNode(d) {
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
  function changeBG() {
    return document.getElementById("colorPicker").value;
    //document.body.style.backgroundColor = document.getElementById("colorPicker").value;
  }
  function del() {
    var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);
    var index = nodes.indexOf(currentNode);
    nodes.splice(index, 1);

    update();
  }

  function edit() {
    var topic = document.getElementById("topic").value;
    if (topic != "") {
      var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);
      var index = nodes.indexOf(currentNode);

      nodes[index].name = topic;

      update();
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <FormControl
            id="topic"
            type="text"
            placeholder="About what do you want to brainstorm?"
            //onChange= {document.getElementById("addBtn").disabled = false}
          />
          <Button
            id="addBtn"
            onClick={add}
            type="submit"
            variant="success"
            value="add"
          >
            Add
          </Button>
          <Button onClick={edit} id="editBtn" type="submit" variant="info">
            Edit
          </Button>
          <Button
            onClick={del}
            id="delBtn"
            type="submit"
            variant="outline-danger"
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ClickMap;
