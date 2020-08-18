import React from "react";
import * as d3 from "d3";

const Session = () => {
  
  var w = window.innerWidth;
  var h = 500;

/*   var svg = d3.select("svg"); //selektiert die svg element mit class (plot) in main.html
 */
   var svg = d3.select("body")      //variable svg soll eine svg element in body kreieren aber kreiert stattdessen zwei auf Meteor+React
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
 

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

  return (
    <div>
      
    </div>
  );
};

export default Session;
