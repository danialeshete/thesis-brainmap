import React, { Component } from "react";
import { ReactComponent as Logo } from './logo_light_wname.svg';
import MindMap from "./MindMap";
import NavBar from "./NavBar";
import Login from "./Login";
import Register from "./Register";
import Session from "./Session";
import Draggable from "./Draggable";
import Banner from "./Banner";
import Lottie from "react-lottie";
import ClickMap from "./ClickMap";
import ForceV3 from "./ForceV3";
import ForceV5 from "./ForceV3";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./NavBar.css";
import * as d3 from "d3";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Container>
            <Navbar expand="lg" id="navbar_banner">
              <Navbar.Brand href="/">
                <Logo/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <a href="/login">Login</a> |<a href="/register">Sign up</a>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Route exact path="/" component={Banner} />
          <Route path="/about" component={Banner} />
          <Route path="/contact" component={Banner} />
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
