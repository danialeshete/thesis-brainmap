import React from "react";
import * as d3 from "d3";
import { FormControl, Button } from "react-bootstrap";
import "./ForceV3.css";

const ForceV3 = () => {
  var width = window.innerWidth,
    height = window.innerHeight - 200,
    curserSize = 100;
var fill = d3.scale.category20();

var force = d3.layout.force()
    .size([width, height])
    .nodes([{}]) // initialize with a single node
    .linkDistance(100)
    .charge(-600)
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedownCanvas);

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var nodes = force.nodes(),
    links = force.links(),
    node = svg.append("g").selectAll("g"),
    link = svg.append("g").selectAll(".link");

var cursor = svg.append("circle")
    .attr("r", 30)
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

restart();

function mousemove() {
  cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
}

function mousedownCanvas() {
  var topic = prompt("Enter your topic : ", "Topic");
  var point = d3.mouse(this),
      node = {x: point[0], y: point[1], text: topic},
      n = nodes.push(node);
  
  // add links to any nearby nodes
  nodes.forEach(function(target) {
    var x = target.x - node.x,
        y = target.y - node.y;
    if (Math.sqrt(x * x + y * y) < 100) {
      links.push({source: node, target: target});
    }
  });

  restart();
}

function mousedownText(d, i) {
  var index = nodes.indexOf(d);
  var topic = prompt("Edit your topic : ", d.text);
  nodes[index].text = topic;
  d3.event.stopPropagation();
  restart();
}

function mousedownCircle(d, i) {
    var retVal = confirm("Do you want to delete this Node ?");
    if( retVal == true ) {
      //Hier wird immer die letzte Node entfernt :(
      nodes.splice(i, 1);
      links = links.filter(function(l) {
        return l.source !== d && l.target !== d;
      });
      d3.event.stopPropagation();

      restart();
    } else {

    }
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.selectAll(".node")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });

  node.selectAll(".circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  
  node.selectAll("text")
      .text(function(n){return n.text});
}

function restart() {
  node = node.data(nodes);

  var insert = node.enter().append("g");

  insert.insert("circle")
      .attr("class", "circle")
      .attr("r", 25)
      .on("mousedown", mousedownCircle);

  insert.insert("text")
      .attr("class", "node")
      .text(function(n){return n.text})
      .on("mousedown", mousedownText);

  node.exit()
      .remove();

  link = link.data(links);

  link.enter().insert("line", ".node")
      .attr("class", "link");
  link.exit()
      .remove();

  force.start();
}


  return (
    <div>

    </div>
  );
};
export default ForceV3;
