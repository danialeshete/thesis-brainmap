import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { FormControl, Button, Container, Col, Row } from "react-bootstrap";

import "./ClickMap.css";

const ClickMap = () => {
  //Startet einmal am Anfang weil "[]"
  useEffect(() => {
    /* savedNodes = localStorage.getItem("savedNodes");
    savedLinks = localStorage.getItem("savedLinks");
    if (savedNodes != null) {
      if (savedNodes.length !== 0) {
        console.log("ist nicht leer");
        update();
      } else {
        console.log("ist leer");
      }
    } */
    /* nodeSaved = localStorage.getItem("nodeSaved");
    linkSaved = localStorage.getItem("linkSaved"); */
    
  }, []);

  function handleKeyPress(e) {
    if (action == "add" && e.key === "Enter") {
      d3.select("#addBtn").attr("border-color", "black");
      add();
    } else if (action == "edit" && e.key === "Enter") {
      //d3.select("#editBtn").attr("border-color", "black");
      edit();
    } else if (action == "another" && e.key === "Enter") {
    }
  }

  function changeActionToAdd() {
    action = "add";
    document.getElementById("topic").value = "";
    document.getElementById("topic").focus();
  }

  function changeActionToEdit() {
    document.getElementById("topic").value = "";
    document.getElementById("topic").value = currentNode.text;
    action = "edit";
    document.getElementById("topic").focus();
  }
  function changeActionToAnother() {
    action = "another";
    document.getElementById("topic").focus();
  }

  var width = window.innerWidth,
    height = window.innerHeight,
    currentNode,
    index,
    savedNodes,
    savedLinks,
    radius = 20,
    action = "add";

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
    .attr("id", "myDivToPrint")
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
    document.getElementById("topic").focus();
    var topic = document.getElementById("topic").value;

    if (topic != "") {
      var node = {
        text: topic,
        colorID: "#F8D2CA"
      };
      if (nodes.length > 0) {
        links.push({ source: node, target: currentNode });
      } else {
        node.colorID = "#caf0f8";
        currentNode = node;
      }
      nodes.push(node);
      saveEachNode();
      update();

      document.getElementById("topic").value = "";
      document.getElementById("topic").placeholder =
        "What are your Ideas to the topic?";
    }
  }
  function update() {
    if (savedNodes != null) {
      if (savedNodes.length !== 0) {
        nodes = JSON.parse(savedNodes);
        console.log(nodes);
      }
    }
    if (savedLinks != null) {
      if (savedLinks.length !== 0) {
        links = JSON.parse(savedLinks);
      }
    }

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
      .attr("class", "text")
      .attr("text-anchor", "middle")
      .on("click", clickNode)
      .call(force.drag);
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
        return (d.x = Math.max(
          radius,
          Math.min(width - d.text.length * 5, d.x)
        ));
      })
      .attr("cy", function(d) {
        /* return (d.y = Math.max(
          radius,
          Math.min(height - d.text.length * 5, d.y)
        )); */
        return d.y - d.text.length;
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
    if (action == "add") {
      document.getElementById("topic").value = "";
      document.getElementById("topic").placeholder = `Add new ideas to "${
        currentNode.text
      }"`;
    } else if (action == "edit") {
      document.getElementById("topic").value = currentNode.text;
    }
    document.getElementById("topic").focus();
  }

  function changeBG() {
    return document.getElementById("colorPicker").value;
    //document.body.style.backgroundColor = document.getElementById("colorPicker").value;
  }
  function del() {
    document.getElementById("topic").focus();

    if (currentNode != undefined && nodes != undefined) {
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
  }

  function edit() {
    document.getElementById("topic").focus();
    var topic = document.getElementById("topic").value;
    if (topic != "") {
      var index = nodes.indexOf(currentNode);
      nodes[index].text = topic;

      update();
      document.getElementById("topic").value = "";
      currentNode = nodes[index];
    }
  }
  force.on("end", function() {
    //speicher localStorage wenn die bobbles stillstehen
    saveToLocalStorage();
    console.log("test");
  });

  //speicher nodes in LocalStorage als savedNodes
  function saveToLocalStorage() {
    localStorage.setItem("savedNodes", JSON.stringify(nodes));
    localStorage.setItem("savedLinks", JSON.stringify(links));
  }
  function saveEachNode(){
    localStorage.setItem("nodeSaved", JSON.stringify(node));
    localStorage.setItem("linkSaved", JSON.stringify(link));
  }

  //id="form" onSubmit={handleSubmit}
  return (
    <Container>
      <Row className="pt-3 menu">
        <Col>
          <Button
            className="m-2"
            id="addBtn"
            onClick={changeActionToAdd}
            type="submit"
            variant="primary"
          >
            Add
          </Button>
          <Button
            className="m-2"
            id="addAnotherBtn"
            onClick={changeActionToAnother}
            type="submit"
            variant="success"
          >
            Another Node
          </Button>
          <Button
            className="m-2"
            onClick={changeActionToEdit}
            id="editBtn"
            variant="secondary"
          >
            Edit
          </Button>
          <Button
            onClick={del}
            id="delBtn"
            type="submit"
            variant="danger"
            className="m-2"
          >
            Delete
          </Button>
          <Button
            onClick={window.print}
            type="submit"
            variant="info"
            className="m-2"
          >
            Export to PDF
          </Button>
        </Col>
      </Row>
      <Row className="menu_input">
        <Col>
          <FormControl
            id="topic"
            type="text"
            onKeyPress={handleKeyPress}
            placeholder="What do you want to brainstorm about?"
            //onChange= {document.getElementById("addBtn").disabled = false}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ClickMap;
