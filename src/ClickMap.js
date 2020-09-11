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
    currentNode,
    index,
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

  var nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link"),
    text = svg.selectAll(".text");

  function add() {
    var topic = document.getElementById("topic").value;
    if (topic != "") {
      var node = {
        text: topic,
        colorID: "#00b4d8"
      };
      if (nodes.length > 0) {
        links.push({ source: node, target: currentNode });
      } else {
        node.colorID = "#caf0f8";
        currentNode = node;
      }
      nodes.push(node);
      update();
      document.getElementById("topic").value = "";
      document.getElementById("topic").placeholder =
        "What are your Ideas to the topic?";
    }
  }

  function update() {
    // Update Circles
    node = node.data(nodes);
    node
      .enter()
      .insert("circle")
      .attr("class", "node")
      .on("click", clickNode)
      .call(force.drag);
    node.exit().remove();

    // Update Text
    text = text.data(nodes);
    text
      .enter()
      .insert("text")
      .attr("class", "text");
    text.exit().remove();

    // Update Links
    link = link.data(links);
    link
      .enter()
      .insert("line", ".node")
      .attr("class", "link");
    link.exit().remove();

    force.start();
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
      .style("fill", d => d.colorID)
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", function(d) {
        return d.text.length * 5;
      });

    text
      .text(function(n) {
        return n.text;
      })
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      });
  }

  function color(d) {
    return d.children ? "#a8dadc" : "#a8dadc";
  }

  function clickNode(d, i) {
    currentNode = d;
    index = i;
    document.getElementById("topic").placeholder = `"${
      currentNode.text
    }" is now active`;
  }

  function changeBG() {
    return document.getElementById("colorPicker").value;
    //document.body.style.backgroundColor = document.getElementById("colorPicker").value;
  }
  function del() {
    nodes.splice(index, 1);
    links = links.filter(function(l) {
      return l.source !== currentNode && l.target !== currentNode;
    });

    update();
    document.getElementById("topic").value = "";
    document.getElementById("topic").placeholder =
      "What are your Ideas to the topic?";
    currentNode = nodes[0];
  }

  function edit() {
    var topic = document.getElementById("topic").value;
    if (topic != "") {
      var index = nodes.indexOf(currentNode);
      nodes[index].text = topic;

      update();
      document.getElementById("topic").value = "";
      currentNode = nodes[index];
      document.getElementById("topic").placeholder = `"${
        currentNode.text
      }" is now active`;
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