import React from "react";
import * as d3 from "d3";

const MindMap = () => {
  
  var w = window.innerWidth;
  var h = 500;

  var svg = d3.select("svg"); //selektiert die svg element mit class (plot) in main.html

  /*  var svg = d3.select("body")      //variable svg soll eine svg element in body kreieren aber kreiert stattdessen zwei auf Meteor+React
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h); */
  var ideaText = [];
  var topicText = [];

  function drawCircle(x, y, size) {
    console.log("Drawing circle at", x, y, size);
    svg
      .append("circle")
      .attr("class", "click-circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", size)
      .style("cursor", "pointer")
      .call(d3.drag().on("drag", dragmove));
  }

  function getIdeaText() {
    var textValue = document.getElementById("ideaTextId").value;
    ideaText.push(textValue);
    console.log(ideaText);
    var x = svg.selectAll("text").data(ideaText);
    console.log(x);
  }
  function getTopicText() {
    var textValue = document.getElementById("topicTextId").value;
    topicText.push(textValue);
    console.log(topicText);
    var x = svg.selectAll("text").data(topicText);
    console.log(x);
  }

  function createIdeaText() {
    svg
      .append("text")
      .attr("class", "circle-text")
      .attr("x", "100")
      .attr("y", ideaText.length * 20)
      .text(() => {
        return ideaText[ideaText.length - 1];
      });
    /* .attr("contentEditable", true) //contenteditable ist zwar true aber kann nicht editiert werden */
  }
  function createTopicText() {
    svg
      .append("text")
      .attr("class", "circle-text")
      .attr("x", "50")
      .attr("y", topicText.length * 20)
      .text(() => {
        return topicText[topicText.length - 1];
      });
    /* .attr("contentEditable", true) //contenteditable ist zwar true aber kann nicht editiert werden */
  }

  function dragmove(d) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this)
      .attr("cx", x)
      .attr("cy", y);
  }
  svg.on("dblclick", function() {
    //double Click to create Circle
    console.log("Double Click");
    var coords = d3.mouse(this);
    console.log(coords);
    drawCircle(coords[0], coords[1], 30);
  });

  //mobile
  d3.select("#createIdea").on("click", () => {
    /* console.log(document.getElementById("ideaTextId").value) */
    getIdeaText();
    drawIdea(30);
    createIdeaText();
    return false;
  });
  d3.select("#createTopic").on("click", () => {
    /* console.log(document.getElementById("ideaTextId").value) */
    getTopicText();
    drawTopic(50);
    createTopicText();
    return false;
  });

  function drawIdea(rad) {
    //kreiert ein circle element bei click auf button auf random koordinate
    svg
      .append("circle")
      .attr("class", "button-circle")
      .style("fill", "red")
      .attr("opacity", 0.4)
      .attr("r", rad)
      .attr("cx", Math.round(Math.random() * w))
      .attr("cy", Math.round(Math.random() * h))
      .style("cursor", "pointer")
      .call(d3.drag().on("drag", dragmove))
      .append("title")
      .text((d, i) => {
        return ideaText[i];
      });
  }
  function drawTopic(rad) {
    //kreiert ein circle element bei click auf button auf random koordinate
    svg
      .append("circle")
      .attr("class", "button-circle")
      .style("fill", "blue")
      .attr("opacity", 0.4)
      .attr("r", rad)
      .attr("cx", w / 2)
      .attr("cy", h / 2)
      .style("cursor", "pointer")
      .call(d3.drag().on("drag", dragmove))
      .append("title")
      .text((d, i) => {
        return ideaText[i];
      });
  }

  return (
    <div>
      <svg className="plot"></svg>
    </div>
  );
};

export default MindMap;
