import React, { Component } from "react";
import MindMap from "./MindMap";
import Login from "./Login";
import Register from "./Register";
import Session from "./Session";
import Draggable from "./Draggable";
import Banner from "./Banner";
import ClickMap from "./ClickMap";
import ForceV3 from "./ForceV3";
import ForceV5 from "./ForceV3";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./NavBar.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Container>
            
          </Container>
          <Route exact path="/" component={Banner} />
          <Route path="/session" component={Session} />
          <Route path="/mindmap" component={MindMap} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/draggable" component={Draggable} />
          <Route path="/clickmap" component={ClickMap} />
          <Route path="/forcev3" component={ForceV3} />
          <Route path="/forcev5" component={ForceV5} />
        </Router>
      </div>
    );
  }
}

export default App;
