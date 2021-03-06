import React, { useEffect } from "react";
import * as d3 from "d3";
import { FormControl, Button, Container, Col, Row, FormLabel } from "react-bootstrap";
import { ReactComponent as Logo } from './logo_dark.svg';
import enter from './enter_key.png';
import "./ClickMap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faFilePdf, faTrashAlt, faEdit, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const ClickMap = () => {
  var width = window.innerWidth,
    height = window.innerHeight - 104,
    currentNode,
    index,
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
    .attr("alt", "The canvas where the brainstorm happens")
    .attr("id", "svgCanvas")
    .attr("width", width)
    .attr("height", height);

  window.addEventListener('touchmove', ev => {
    ev.preventDefault();
  }, { passive: false });

  if (nodes != null) {
    var nodes = force.nodes(JSON.parse(localStorage.getItem("savedNodes"))),
      links = force.links(JSON.parse(localStorage.getItem("savedLinks")));
  } else {
    var nodes = force.nodes(), links = force.links();
  }

  var node = svg.selectAll(".node"),
    link = svg.selectAll(".link"),
    text = svg.selectAll(".text");

  //Startet einmal am Anfang weil "[]"
  useEffect(() => {
    /*  nodes = JSON.parse(localStorage.getItem("savedNodes"));
     links = JSON.parse(localStorage.getItem("savedLinks")); */

    if (nodes != null) {
      if (nodes.length !== 0) {
        update();
      } else {
      }
    } else {
      nodes = force.nodes();
      links = force.links();
      console.log("ist leer");
    }
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
  function handleGoButton() {
    if (action == "add") {
      d3.select("#addBtn").attr("border-color", "black");
      add();
    } else if (action == "edit") {
      //d3.select("#editBtn").attr("border-color", "black");
      edit();
    }
  }

  function changeActionToAdd() {
    
    document.getElementById("topicLabel").innerHTML = `Add has been selcted. Enter or "Go" to add an Idea `;
    action = "add";
    document.getElementById("topic").value = "";
    document.getElementById("topic").focus();
  }

  function changeActionToEdit() {
    document.getElementById("topicLabel").innerHTML = `Edit has been selcted. Click on the Node to change it. `;
    document.getElementById("topic").value = "";
    if (currentNode != undefined && nodes != undefined && document.getElementById("topic").value != "") {
      document.getElementById("topic").value = currentNode.text;
    }
    action = "edit";
    document.getElementById("topic").focus();
  }

  function add() {
    //document.getElementById("topic").focus();
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

      update();

      saveToLocalStorage();

      document.getElementById("topic").value = "";
      document.getElementById("topic").placeholder =
        "What are your Ideas to the topic?";
    }
  }
  function update() {
    if (nodes != null) {
      if (nodes.length !== 0) {
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
        console.log(nodes);
        console.log(links);
      }
    }
  }

  function tick() {
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node
      .style("fill", d => d.colorID)
      .attr("cx", function (d) {
        return (d.x = Math.max(
          radius,
          Math.min(width - d.text.length * 5, d.x)
        ));
      })
      .attr("cy", function (d) {
        return (d.y = Math.max(
          radius,
          Math.min(height - d.text.length * 5, d.y)
        ));
        //return d.y - d.text.length;
      })
      .attr("r", function (d) {
        if (d.text.length < 5) {
          return 25;
        } else {
          return d.text.length * 5;
        }
      });

    text
      .text(function (n) {
        return n.text;
      })
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
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


  function del() {
    document.getElementById("topic").focus();

    if (currentNode != undefined && nodes != undefined) {
      nodes.splice(index, 1);
      links = links.filter(function (l) {
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
  force.on("end", function () {
    //speicher localStorage wenn die bobbles stillstehen
  });

  //speicher nodes in LocalStorage als savedNodes
  function saveToLocalStorage() {
    localStorage.setItem("savedNodes", JSON.stringify(nodes));
    localStorage.setItem("savedLinks", JSON.stringify(links));
  }
  function saveEachNode() {
    localStorage.setItem("nodeSaved", JSON.stringify(node));
    localStorage.setItem("linkSaved", JSON.stringify(link));
  }





  //id="form" onSubmit={handleSubmit}
  return (
    <Container>
      <Row className="justify-content mx-auto pt-3 menu">
        <Col>

          <span className="mr-3 ">

            <Logo id="logo" />

          </span>




          <Button
            className="m-2 btn-br"
            id="addBtn"
            onClick={changeActionToAdd}
            type="submit"
            variant="primary"


          >
            <FontAwesomeIcon icon={faPlusCircle} />
            ⠀<span> Add</span>
          </Button>

          <Button
            className="m-2 btn-br"
            onClick={changeActionToEdit}
            id="editBtn"
            type="submit"
            variant="secondary"
          >
            <FontAwesomeIcon icon={faEdit} />

            ⠀<span style={{ colo: "#080808" }}> Edit</span>
          </Button>
          <Button
            onClick={del}
            id="delBtn"
            type="submit"
            variant="danger"
            className="m-2 btn-br"
          >
            <FontAwesomeIcon icon={faTrashAlt} />

            <span> Delete</span>
          </Button>
          <Button
            onClick={window.print}
            type="submit"
            variant="info"
            className="m-2 btn-br"
            id="expBtn"
          >
            <FontAwesomeIcon icon={faFilePdf} />

            <span> Export</span>
          </Button>

        </Col>
      </Row>
      <Row>
        <FormLabel htmlFor="topic" id="formLabel" > ⠀ <span id="topicLabel">Write your Ideas and press the Enter key or  "Go"</span></FormLabel>
      </Row>
      <Row className="menu_input">
        <Col sm={8} xs={10}>
          <FormControl
            id="topic"
            type="text"
            onKeyPress={handleKeyPress}
            placeholder="What do you want to brainstorm about?"
          //onChange= {document.getElementById("addBtn").disabled = false}
          />
        </Col>
        <Col sm={2} xs={2}>
          <Button
            onClick={handleGoButton}
            accessibilitylabel="Go"
            type="submit"
            variant="success"
            id="go btn-br">
            <FontAwesomeIcon id="goIcon" icon={faArrowCircleRight} />
            <span>Go</span>
          </Button>

        </Col>
      </Row>
    </Container>
  );
};

export default ClickMap;
