import React from "react";
import * as d3 from "d3";
import { FormControl, Button } from "react-bootstrap";

const Draggable = () => {
  //Width and height
  var w = 500;
  var h = 300;

  //Original data
  var dataset = {
    nodes: [
      { name: "Adam" },
      { name: "Bob" },
      { name: "Carrie" },
      { name: "Donovan" },
      { name: "Edward" },
      { name: "Felicity" },
      { name: "George" },
      { name: "Hannah" },
      { name: "Iris" },
      { name: "Jerry" }
    ],
    edges: [
      /* { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 1, target: 5 },
      { source: 2, target: 5 },
      { source: 2, target: 5 },
      { source: 3, target: 4 },
      { source: 5, target: 8 },
      { source: 5, target: 9 },
      { source: 6, target: 7 },
      { source: 7, target: 8 },
      { source: 8, target: 9 } */
      {source: 0, target: 1},
      {source: 0, target: 2},
      {source: 0, target: 3},
      {source: 0, target: 4},
      {source: 0, target: 5},
      {source: 0, target: 6},
      {source: 0, target: 7},
      {source: 0, target: 8},
      {source: 0, target: 9}
    ]
  };

  //Initialize a simple force layout, using the nodes and edges in dataset
  var force = d3
    .forceSimulation(dataset.nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(dataset.edges))
    .force(
      "center",
      d3
        .forceCenter()
        .x(w / 2)
        .y(h / 2)
    );

  var colors = d3.scaleOrdinal(d3.schemeCategory10);

  //Create SVG element
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create edges as lines
  var edges = svg
    .selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);

  //Create nodes as circles
  var nodes = svg
    .selectAll("circle")
    .data(dataset.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .style("fill", function(d, i) {
      return colors(i);
    })
    .call(
      d3
        .drag() //Define what to do on drag events
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded)
    );

  //Add a simple tooltip
  nodes.append("title").text(function(d) {
    return d.name;
  });

  //Every time the simulation "ticks", this will be called
  force.on("tick", function() {
    edges
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

    nodes
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  });

  //Define drag event functions
  function dragStarted(d) {
    if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragEnded(d) {
    if (!d3.event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

/*   $(el).bind(“updateD3”, function() { 
   console.log('Updating …');
  })
  $(el).trigger("updateD3"); // Updating ... */

  var x = dataset.nodes.length;
  var array = Array();
  console.log(dataset.nodes)
  console.log(dataset.nodes[x-1].name)
  console.log(dataset.nodes.length)
  
  function add_element_to_nodes() {
    var text= document.getElementById("text1").value;
    console.log("text1: "+text);
    dataset.nodes.push({name: text, x: Math.random() * w, 
    y: Math.random() * h });
    console.log("Element: " + dataset.nodes[x-1] + " Added at index " + x);
    x++;
    document.getElementById("text1").value = "";
    console.log(dataset.nodes);
    
    
/*     var e = "<hr/>";

    for (var y = 0; y < dataset.nodes.length; y++) {
      e += "Element " + y + " = " + dataset.nodes[y] + "<br/>";
    }
    document.getElementById("Result").innerHTML = e; */
  }
  function add_edges_to_nodes() {
    dataset.edges[x] = document.getElementById("text1").value;
    console.log("Element: " + dataset.edges[x] + " Added at index " + x);
    x++;
    document.getElementById("text1").value = "";
/*     var e = "<hr/>";

    for (var y = 0; y < nodes.length; y++) {
      e += "Element " + y + " = " + nodes[y] + "<br/>";
    }
    document.getElementById("Result").innerHTML = e; */
  }
  
  return (
    <div>
      <FormControl type="text" id="text1"></FormControl>
      <FormControl type="button" id="button1" value="Add" onClick={add_element_to_nodes}></FormControl>

      <div id="Result"></div> 

      <Button variant="primary" id="createTopic">
        Topic{" "}
      </Button>
      <FormControl type="text" id="topicTextId" defaultValue="Topic" />
      <Button variant="secondary" id="createIdea">
        Idea{" "}
      </Button>
      <FormControl type="text" id="ideaTextId" defaultValue="Idea" />
    </div>
  );
};

export default Draggable;
